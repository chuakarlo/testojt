define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var _          = require( 'underscore' );
	var Backbone   = require( 'backbone' );
	var Session    = require( 'Session' );
	var startsWith = require( 'common/helpers/startsWith' );

	App.module( 'ContentNavigation.Entities', function ( Entities ) {

		Entities.pd360QueryModel = Backbone.CFModel.extend( {

			'defaults' : {
				'numFound'    : 0,
				'start'       : 0,
				'rows'        : 24,
				'searchType'  : 'VideosCore',
				'searchData'  : '',
				'sort'        : 'created desc',
				'searchArray' : [ ]
			}

		} );

		Entities.PD360VideoModel = Backbone.CFModel.extend( {

			'idAttribute' : 'ContentId',
			'initialize'  : function () {
				this.set( 'VideoTypeId', 1 );
			}
		} );

		Entities.PD360VideosCollection = Backbone.CFCollection.extend( {

			'path'  : 'SearchService',
			'model' : Entities.PD360VideoModel,

			'initialize' : function () {
				this.gradeFilters = [ ];
				this.subjectFilters = [ ];
				this.topicFilters = [ ];
			},

			'getReadOptions' : function () {
				return {
					'method' : 'RespondSearchAPI',
					'args'   : {
						'persId'     : Session.personnelId(),
						'start'      : this.queryModel.get( 'start' ),
						'rows'       : this.queryModel.get( 'rows' ) ,
						'searchType' : this.queryModel.get( 'searchType' ),
						'searchData' : this.queryModel.get( 'searchData' ),
						'sort'       : this.queryModel.get( 'sort' )
					}
				};
			},

			'parse' : function ( res ) {
				var vids = _.filter( res, function ( segment ) {
					var isArchived = startsWith( segment.ContentName, 'Archive:' );

					if ( !isArchived ) {
						return segment;
					}
				} );
				return vids;
			},

			'updateStart' : function () {
				var start = this.queryModel.get( 'start' );
				var rows  = this.queryModel.get( 'rows' );

				this.queryModel.set( 'start', rows + start );
			},

			'updateSearchData' : function ( term, category, clearCollection ) {

				var filterMap = {
					'Grades'   : this.gradeFilters,
					'Subjects' : this.subjectFilters,
					'Topics'   : this.topicFilters
				};
				// if item is not in array
				if ( term ) {
					// var index = this.queryModel.get( 'searchArray' ).indexOf( term );
					var index = filterMap[ category ].indexOf( term );

					if ( index === -1 ) {
						filterMap[ category ].push( term );
						// this.queryModel.get( 'searchArray' ).push( term );
					} else {
						filterMap[ category ].splice( index, 1 );
						// this.queryModel.get( 'searchArray' ).splice( index, 1 );
					}

				}

				if ( clearCollection ) {
					var filter = clearCollection.at( 0 );
					category = filter.get( 'category' );

					switch ( category ) {

						case 'Grades' :
							this.gradeFilters = [ ];
							break;
						case 'Subjects' :
							this.subjectFilters = [ ];
							break;
						case 'Topics' :
							this.topicFilters = [ ];
					}

				}

				var filters = [
					this.gradeFilters,
					this.subjectFilters,
					this.topicFilters
				];

				var delimitedFilters = [ ];

				// Probably a better way to do this. This is so we can group
				// the filters together and separate by the | character
				_.each( filters, function ( filter ) {
					if ( filter.length ) {
						if ( delimitedFilters.length ) {
							delimitedFilters.push( '|' );
							delimitedFilters.push( filter );
						} else {
							delimitedFilters.push( filter );
						}
					}
				} );

				this.queryModel.set( 'searchData', _.flatten( delimitedFilters ).join( ', ' ) );
			}

		} );

		var API = {

			'initializePD360Videos' : function ( defer, queryModel ) {

				var collection = new Entities.PD360VideosCollection();
				collection.queryModel = queryModel;

				collection.fetch( {

					'success' : function ( data ) {
						defer.resolve( collection );
					},

					'error' : function () {
						defer.reject( 'There was an error fetching PD 360 Videos.' );
					}

				} );
			},

			'getPD360Videos' : function ( queryModel ) {

				var defer = App.Deferred();
				this.initializePD360Videos( defer, queryModel );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'contentNavigation:pd360Videos', function ( queryModel ) {
			return API.getPD360Videos( queryModel );
		} );

	} );

} );
