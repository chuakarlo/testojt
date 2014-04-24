// ## Manages f/e logic for the application
define( function( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var  _         = require( 'underscore' );

	var ControllerBase		= {
		'Content'	: require( '../base/ContentBase' )
	};

	var Session   = require( 'Session' );




	var UserUploadedContentController = Marionette.Controller.extend( {

		'initialize' : function( options ) {
			_.extend( this , ControllerBase.Content );

			this.Categories = {
				'My Uploads' : {
					'path'   : 'com.schoolimprovement.pd360.dao.uuvideos.UUVideoGateway',
					'method' : 'getByCreatorId',
					'args'   : {
						'id' : Session.personnelId()
					}
				},
				'Popular' : {
					'path'   : 'com.schoolimprovement.pd360.dao.uuvideos.UUVideoGateway',
					'method' : 'getMostPopularUUVideos',
					'args'   : {
						'startRow' : this._getStartingRow(),
						'maxRows'  : this.queryLimit
					}
				},
				'Recommended For You' : {
					'path'   : 'com.schoolimprovement.pd360.dao.UUVideoService',
					'method' : 'getRecommendedUUVideos',
					'args'   : {
						'persId' : Session.personnelId(),
						'startRow' : this._getStartingRow(),
						'maxRows'  : this.queryLimit
					}
				},
				'Featured' : {
					'path'   : 'com.schoolimprovement.pd360.dao.uuvideos.UUVideoGateway',
						'method' : 'getFeaturedUUVideos',
						'args'   : {
							'startRow' : this._getStartingRow(),
							'maxRows'  : this.queryLimit
					}
				}
			};

			this._createVents( options );

			this._setSortParam();

			this.initializeCollection( options, 'UUV' );

			this.initializeComponent();

			this.contentLibraryType = options.contentLibraryType;

			this.App = options.App;

			this.initializeFetching( 'Popular'  );
		},

		'_getSegmentParams'	: function ( data ) {

			if( this.Categories[ data ] ){
				return this.Categories[ data ];
			} else  {

				return {
						'path'   : 'com.schoolimprovement.pd360.dao.SearchService',
						'method' : 'RespondSearchAPI',
						'args'   : {
						  'persId'     : Session.personnelId(),
						  'start'      : this._getStartingRow(),
						  'rows'       : this.queryLimit,
						  'searchType' : 'VideosUserUploaded',
						  'searchData' : data,
						  'sort'       : this.sortByParam
						}
				};
			}
		}

	} );

	return UserUploadedContentController;
 } );
