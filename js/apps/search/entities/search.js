define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var Session  = require( 'Session' );

	App.module( 'Entities', function ( Mod ) {

		//------------------------------------
		// Search Navigation Entities
		//------------------------------------
		Mod.SearchNavModel = Backbone.Model.extend( {
			'defaults' : {
				'active'  : false,
				'results' : 0
			},

			'initialize' : function () {
				// Set the results to 0 if they change tabs
				this.on('change:activer', function ( model, val ) {
					if (!val) {
						this.set('results', 0);
					}
				} );
			}
		} );

		Mod.SearchNavCollection = Backbone.Collection.extend( {

			'model' : Mod.SearchNavModel,

			'setActive' : function ( filter ) {
				this.deactivateAll();
				// If we have a filter, set it
				if ( filter ) {
					this.findWhere( { 'filter' : filter } )
						.set( 'active', true );
				} else {
					this.get( 'All' )
						.set( 'active', true );
				}
			},

			'deactivateAll' : function () {
				_.each(this.models, function ( model ) {
					model.set( 'active', false );
				} );
			},

			'setResultCount' : function ( count ) {
				var active = this.findWhere( { 'active' : true } );
				active.set( 'results', count );
			}
		} );

		//------------------------------------
		// Search Result Entities
		//------------------------------------

		Mod.ColleagueModel = Backbone.Model.extend();

		Mod.CommunityModel = Backbone.Model.extend();

		Mod.SearchGroupModel = Backbone.Model.extend();

		Mod.VideoModel = Backbone.Model.extend();

		// This guy is all about the search meta data
		Mod.SearchQueryModel = Backbone.Model.extend({
			'defaults' : {
				'numFound'   : 0,
				'start'      : 0,
				'rows'       : 24,
				'searchType' : 'All',
				'sort'       : 'created desc',
				'searchData' : ''
			},

			'updateStart' : function () {
				// do we need to take into account the numFound here?
				var start = this.get( 'start' );
				var rows  = this.get( 'rows' );
				//var found = this.get( 'numFound' );

				this.set( 'start', rows + start);
			}

		});

		Mod.SearchCollection = Backbone.CFCollection.extend( {

			// Endpoint for the CF model
			'path' : 'SearchService',

			// Required function for CF models
			'getReadOptions' :  function () {
				return {
					'method' : 'RespondSearchAPI',
					'args'   : {
						'persId'     : Session.personnelId(),
						'start'      : this.queryModel.get( 'start' ),
						'rows'       : this.queryModel.get( 'rows' ),
						'searchType' : this.queryModel.get( 'searchType' ),
						'sort'       : this.queryModel.get( 'sort' ),
						'searchData' : this.queryModel.get( 'searchData' )
					}
				};
			},

			'createModels' : function ( results, ModelType, type ) {
				var temp = [ ];
				_.each(results, function ( result ) {
					var m = new ModelType( result );
					// I'm setting this incase we need this later
					m.set( 'frontend-type', type );
					temp.push(m);
				} );
				return temp;
			},

			'parse' : function ( res, options ) {

				var searchType = this.queryModel.get( 'searchType' );

				if ( searchType === 'All' ) {

					if ( res.RESULTS === 'No Results Found') {
						// We didn't find any results if there is only 1
						this.queryModel.set('numFound', 0);
						return;
					} else {
						// Set the results which keeps track of how many
						// results we get.
						this.queryModel.set( res.RESULTS.SCORING );
						delete res.RESULTS;
					}

					// store all the models so we can shuffle them before
					// we add them
					var parsedModels = [ ];

					parsedModels.push(
						this.createModels( res.COLLEAGUES, Mod.ColleagueModel, 'users')
					);

					parsedModels.push(
						this.createModels( res.COMMUNITY, Mod.CommunityModel, 'communities')
					);

					parsedModels.push(
						this.createModels( res.GROUPS, Mod.SearchGroupModel, 'groups' )
					);

					parsedModels.push(
						this.createModels( res.VIDEOS, Mod.VideoModel, 'videos' )
					);

					// Flatten the first level
					parsedModels = _.flatten(parsedModels, true);
					// Mixem up!
					parsedModels = _.shuffle(parsedModels);

					// Just add it to the collection instead of returning
					this.add(parsedModels);

				} else {
					if (res.length === 1) {
						// We didn't find any results if there is only 1
						this.queryModel.set('numFound', 0);
						return;
					} else {
						// Set the results which keeps track of how many
						// results we get. Magic number alert
						this.queryModel.set( res[ 0 ] );
					}

					// Get rid of the result object / message
					res.shift();

					var models = [ ];
					switch (searchType) {
						case 'VideosAll' :
							models = this.createModels( res, Mod.VideoModel, 'videos');
							break;

						case 'Groups' :
							models = this.createModels( res, Mod.SearchGroupModel, 'groups' );
							break;

						case 'Communities' :
							models = this.createModels( res, Mod.CommunityModel, 'communities');
							break;

						case 'People' :
							models = this.createModels( res, Mod.ColleagueModel, 'users');
							break;

					}
					// Just add it to the collection instead of returning
					this.add(models);
				}

			}

		} );
	} );
} );
