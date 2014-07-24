define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var _          = require( 'underscore' );
	var Backbone   = require( 'backbone' );
	var Session    = require( 'Session' );
	var startsWith = require( 'common/helpers/startsWith' );

	App.module( 'ContentNavigation.Entities', function ( Entities ) {

		Entities.UUVCategoriesModel = Backbone.Model.extend ( {

		} );

		Entities.UUVCategoriesCollection = Backbone.Collection.extend( {
			'model' : Entities.UUVCategoriesModel
		} );

		Entities.UUVQueryModel = Backbone.CFModel.extend( {

			'defaults' : {
				'numFound'          : 0,
				'lastResultsLength' : 0,
				'method'            : 'getMostPopularUUVideos',
				'path'              : 'com.schoolimprovement.pd360.dao.uuvideos.UUVideoGateway',
				'id'                : null,
				'persId'            : null,
				'start'             : 0,
				'rows'              : 24,
				'searchType'        : 'VideosUserUploaded',
				'searchData'        : '',
				'args'              : { }
			},

			'initialize' : function () {
				var sessionID = Session.personnelId();
				this.set( 'id', sessionID );
				this.set( 'persId', sessionID );
			}

		} );

		Entities.UUVideoModel = Backbone.CFModel.extend( {

			'idAttribute' : 'UUVideoId',
			'defaults'    : {
				'VideoTypeId' : 2
			},
			'initialize'  : function () {
				this.set( 'VideoTypeId', 2 );
			},

			'getId' : function () {
				return this.get( 'UUVideoId' );
			}
		} );

		Entities.UUVideosCollection = Backbone.CFCollection.extend( {

			'model'      : Entities.UUVideoModel,
			'My Uploads' : {
				'path'   : 'uuvideos.UUVideoGateway',
				'method' : 'getByCreatorId',
				'args'   : {
					'id' : null
				}
			},
			'Popular' : {
				'path'   : 'uuvideos.UUVideoGateway',
				'method' : 'getMostPopularUUVideos',
				'args'   : {
					'startRow' : 0,
					'maxRows'  : 24
				}
			},
			'Recommended For You' : {
				'path'   : 'UUVideoService',
				'method' : 'getRecommendedUUVideos',
				'args'   : {
					'persId'   : null,
					'startRow' : 0,
					'maxRows'  : 24
				}
			},
			'Featured' : {
				'path'   : 'uuvideos.UUVideoGateway',
				'method' : 'getFeaturedUUVideos',
				'args'   : {
					'startRow' : 0,
					'maxRows'  : 24
				}
			},
			'Other Categories' : {
				'path'   : 'SearchService',
				'method' : 'RespondSearchAPI',
				'args'   : {
					'persId'     : null,
					'start'      : 0,
					'rows'       : 24,
					'searchType' : 'VideosUserUploaded',
					'searchData' : '',
					'sort'       : 'created desc'
				}
			},

			'parse' : function ( res ) {
				var vids = _.filter( res, function ( segment ) {
					var isArchived = startsWith( segment.Name, 'Archive:' );

					if ( !isArchived ) {
						return segment;
					}
				} );
				return vids;
			},

			'path' : function () {
				return this.queryModel.get( 'path' );
			},

			'getReadOptions' : function () {
				return {
					'method' : this.queryModel.get( 'method' ),
					'args'   : this.queryModel.get( 'args' )
				};
			},

			'setArgs' : function ( Library ) {

				var sessionID = Session.personnelId();
				var args      = this[ Library ].args;

				this.queryModel.set( 'path', this[ Library ].path );
				this.queryModel.set( 'method', this[ Library ].method );

				if ( args.hasOwnProperty( 'persId' ) ) {
					args.persId = sessionID;
				}

				if ( args.hasOwnProperty( 'id' ) ) {
					args.id = sessionID;
				}

				this.queryModel.set( 'args', args );
			},

			'resetStart' : function () {
				var start = this.queryModel.get( 'start' );
				var args  = this.queryModel.get( 'args' );

				if ( args.hasOwnProperty( 'start' ) ) {
					args.start = start;
				}

				if ( args.hasOwnProperty( 'startRow' ) ) {
					args.startRow = start;
				}

				this.queryModel.set( 'args', args );
			},

			'updateStart' : function () {
				var start = this.queryModel.get( 'start' );
				var rows  = this.queryModel.get( 'rows' );

				this.queryModel.set( 'start', rows + start );

				var args = this.queryModel.get( 'args' );

				if ( args.hasOwnProperty( 'start' ) ) {
					args.start = this.queryModel.get( 'start' );
				}

				if ( args.hasOwnProperty( 'startRow' ) ) {
					args.startRow = this.queryModel.get( 'start' );
				}

				this.queryModel.set( 'args', args );
			},

			'updateSearchData' : function ( category ) {
				var args = this.queryModel.get( 'args' );

				if ( args.hasOwnProperty( 'searchData' ) ) {
					args.searchData = category;
				}

				this.queryModel.set( 'args', args );
			}

		} );

		var API = {

			'initializeUUVideos' : function ( defer, queryModel ) {

				var collection = new Entities.UUVideosCollection();
				collection.queryModel = queryModel;

				collection.fetch( {

					'success' : function ( data ) {
						defer.resolve( collection );
					},

					'error' : function () {
						defer.reject( 'There was an error fetching User Uploaded Videos.' );
					}

				} );
			},

			'getUUVideos' : function ( queryModel ) {

				var defer = App.Deferred();
				this.initializeUUVideos( defer, queryModel );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'contentNavigation:uuv:getSegments', function ( queryModel ) {
			return API.getUUVideos( queryModel );
		} );

	} );

} );
