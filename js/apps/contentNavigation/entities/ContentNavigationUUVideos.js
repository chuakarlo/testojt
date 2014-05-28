define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );

	App.module( 'ContentNavigation.Entities', function ( Entities ) {

		Entities.UUVCategories = [
			{ 'id' : 'My Uploads', 'title' : 'My Uploads' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Popular', 'title' : 'Popular', 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Recommended For You', 'title' : 'Recommended For You' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Featured', 'title' : 'Featured' , 'library' : 'Sinet Internal Training' },

			{ 'id' : 'Aha Moments', 'UUVideoTopicId' : 1, 'title' : 'Aha Moments' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Best Practices', 'UUVideoTopicId' : 2, 'title' : 'Best Practices', 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Celebrating Accomplishments', 'UUVideoTopicId' : 3, 'title' : 'Celebrating Accomplishments' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Classroom Management', 'UUVideoTopicId' : 4, 'title' : 'Classroom Management' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Coaching', 'UUVideoTopicId' : 5, 'title' : 'Coaching' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Community & Family Involvement', 'UUVideoTopicId' : 6, 'title' : 'Community & Family Involvement', 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Differentiation', 'UUVideoTopicId' : 7, 'title' : 'Differentiation' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Equity, Diversity, & Race', 'UUVideoTopicId' : 8, 'title' : 'Equity, Diversity, & Race' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Examining Student Work', 'UUVideoTopicId' : 9, 'title' : 'Examining Student Work' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Global Education', 'UUVideoTopicId' : 10, 'title' : 'Global Education', 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Inquiry & Project-Based Education', 'UUVideoTopicId' : 11, 'title' : 'Inquiry & Project-Based Education' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Instructional Strategies', 'UUVideoTopicId' : 12, 'title' : 'Instructional Strategies' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Intervention', 'UUVideoTopicId' : 13, 'title' : 'Intervention' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Just For Fun', 'UUVideoTopicId' : 14, 'title' : 'Just For Fun', 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Motivational', 'UUVideoTopicId' : 15, 'title' : 'Motivational' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Other', 'UUVideoTopicId' : 16, 'title' : 'Other' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'PLC & Collaboration', 'UUVideoTopicId' : 17, 'title' : 'PLC & Collaboration' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Powerful Leadership', 'UUVideoTopicId' : 18, 'title' : 'Powerful Leadership', 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Professional Development', 'UUVideoTopicId' : 19, 'title' : 'Professional Development' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'School Culture', 'UUVideoTopicId' : 20, 'title' : 'School Culture' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Student Engagement', 'UUVideoTopicId' : 21, 'title' : 'Student Engagement' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Success Stories', 'UUVideoTopicId' : 22, 'title' : 'Success Stories', 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Teachers Shine', 'UUVideoTopicId' : 23, 'title' : 'Teachers Shine' , 'library' : 'Sinet Internal Training' },
			{ 'id' : 'Technology in the Classroom', 'UUVideoTopicId' : 24, 'title' : 'Technology in the Classroom' , 'library' : 'Sinet Internal Training' }
		] ;

		Entities.UUVQueryModel = Backbone.CFModel.extend( {

			'defaults' : {
				'numFound'          : 0,
				'lastResultsLength' : 0,
				'method'            : 'getMostPopularUUVideos',
				'path'              : 'com.schoolimprovement.pd360.dao.uuvideos.UUVideoGateway',
				'id'                : Session.personnelId(),
				'persId'            : Session.personnelId(),
				'start'             : 0,
				'rows'              : 24,
				'searchType'        : 'VideosUserUploaded',
				'searchData'        : '',
				'args'              : { }
			}

		} );

		Entities.UUVideoModel = Backbone.CFModel.extend( {

			'idAttribute' : 'UUVideoId',
			'initialize'  : function () {
				this.set( 'VideoTypeId', 2 );
			}
		} );

		Entities.UUVideosCollection = Backbone.CFCollection.extend( {

			'model'      : Entities.UUVideoModel,
			'My Uploads' : {
				'path'   : 'uuvideos.UUVideoGateway',
				'method' : 'getByCreatorId',
				'args'   : {
					'id' : Session.personnelId()
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
					'persId'   : Session.personnelId(),
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
					'persId'     : Session.personnelId(),
					'start'      : 0,
					'rows'       : 24,
					'searchType' : 'VideosUserUploaded',
					'searchData' : '',
					'sort'       : 'created desc'
				}
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
				this.queryModel.set( 'path', this[ Library ].path );
				this.queryModel.set( 'method', this[ Library ].method );
				this.queryModel.set( 'args', this[ Library ].args );
			},

			'updateStart' : function () {
				var start = this.queryModel.get( 'start' );
				var rows  = this.queryModel.get( 'rows' );

				this.queryModel.set( 'start', rows + start );

				var args = this.queryModel.get( 'args' );

				if ( args.hasOwnProperty( 'start' ) ) {
					args.start = this.queryModel.get( 'start' );
					this.queryModel.set( 'args', args );
				}

				if ( args.hasOwnProperty( 'startRow' ) ) {
					args.startRow = this.queryModel.get( 'start' );
					this.queryModel.set( 'args', args );
				}
			},

			'updateSearchData' : function ( category ) {
				var args = this.queryModel.get( 'args' );

				if ( args.hasOwnProperty( 'searchData' ) ) {
					args.searchData = category;
					this.queryModel.set( 'args', args );
				}
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
