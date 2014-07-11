define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var Session  = require( 'Session' );

	App.module( 'Entities', function ( Mod ) {

		// ------------------------------------
		// Search Navigation Entities
		// ------------------------------------
		Mod.SearchNavModel = Backbone.Model.extend( {
			'defaults' : {
				'active'  : false,
				'results' : 0
			},

			'initialize' : function () {
				// Set the results to 0 if they change tabs
				this.on( 'change:active', function ( model, val ) {
					if ( !val ) {
						this.set( 'results', 0 );
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
				_.each( this.models, function ( model ) {
					model.set( 'active', false );
				} );
			},

			'setResultCount' : function ( count ) {
				var active = this.findWhere( { 'active' : true } );
				active.set( 'results', count );
			}

		} );

		// ------------------------------------
		// Search Result Entities
		// ------------------------------------

		Mod.CommunityModel = Backbone.Model.extend( {

			'idAttribute' : 'LicenseId',
			'isVideo'     : false

		} );

		Mod.SearchGroupModel = Backbone.Model.extend( {

			'idAttribute' : 'LicenseId',
			'isVideo'     : false

		} );

		Mod.VideoModel = Backbone.Model.extend( {

			'isVideo' : true,

			'initialize' : function () {
				// get Uploaded field
				var isUUV = this.get( 'Uploaded' );

				// check if it is UUV and ready the videoTypeId
				// 1 for non-User uploaded videos and 2 for User Uploaded Videos
				var videoTypeId = Boolean ( isUUV ) + 1;

				// set the video type id in the model
				this.set( 'VideoTypeId', videoTypeId );

				// set model id
				this.id = this.getId();
			},

			'getId' : function () {

				// If there is a UUVideoId attribute with a value,
				// it's a User uploaded video
				if ( this.get( 'UUVideoId' ) ) {
					return this.get( 'UUVideoId' );
				}
				return this.get( 'ContentId' );
			},

			'setQueue' : function ( queueContentsIds ) {
				this.set( 'queued', _.contains( queueContentsIds, this.id ) );
			}

		} );

		// This guy is all about the search meta data
		Mod.SearchQueryModel = Backbone.Model.extend( {
			'defaults' : {
				'numFound'   : 0,
				'start'      : 0,
				'rows'       : 24,
				'searchType' : 'All',
				'sort'       : 'score desc',
				'searchData' : ''
			},

			'updateStart' : function () {
				// do we need to take into account the numFound here?
				var start = this.get( 'start' );
				var rows  = this.get( 'rows' );
				// var found = this.get( 'numFound' );

				this.set( 'start', rows + start );
			}

		} );

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

				_.each( results, function ( result ) {
					var m = new ModelType( result );

					// I'm setting this incase we need this later
					m.set( 'frontend-type', type );
					temp.push( m );
				} );

				return temp;
			},

			'comparator' : function ( a, b ) {
				return -( a.get( 'SolrScore' ) - b.get( 'SolrScore' ) );
			},

			'parse' : function ( res, options ) {

				// We can't pull from the query model incase there was an
				// additional search performed. Pass the filter in when
				// fetching the data.
				var searchType = options.filter;

				// If we don't match on the searchType, they must have changed
				// tabs and we don't care about this response anymore...
				if ( this.queryModel.get( 'searchType' ) !== searchType ) {
					return ;
				}

				if ( searchType === 'All' ) {

					// Clear the last numFound so backbone can trigger the
					// event again.
					this.queryModel.set( 'numFound', 0 );

					if ( res.RESULTS === 'No Results Found' ) {
						// We didn't find any results if there is only 1
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
						this.createModels( res.COMMUNITY, Mod.CommunityModel, 'communities' )
					);

					parsedModels.push(
						this.createModels( res.GROUPS, Mod.SearchGroupModel, 'groups' )
					);

					parsedModels.push(
						this.createModels( res.VIDEOS, Mod.VideoModel, 'videos' )
					);

					// Flatten the first level
					parsedModels = _.flatten( parsedModels, true );

					return parsedModels;

				} else {
					// Clear the last numFound so backbone can trigger the
					// event again.
					this.queryModel.set( 'numFound', 0 );

					if ( res.length === 1 ) {
						// We didn't find any results if there is only 1
						return;
					} else {
						// Set the results which keeps track of how many
						// results we get. Magic number alert
						this.queryModel.set( res[ 0 ] );
					}

					// Get rid of the result object / message
					res.shift();

					var models = [ ];
					switch ( searchType ) {
						case 'VideosAll' :
							models = this.createModels( res, Mod.VideoModel, 'videos' );
							break;

						case 'Groups' :
							models = this.createModels( res, Mod.SearchGroupModel, 'groups' );
							break;

						case 'Communities' :
							models = this.createModels( res, Mod.CommunityModel, 'communities' );
							break;

					}

					// Just add it to the collection instead of returning
					this.add( models );
				}

			}

		} );

	} );

} );
