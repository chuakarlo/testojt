define( function ( require ) {
	'use strict';

	var _                  = require( 'underscore' );
	var Backbone           = require( 'backbone' );
	var Session            = require( 'Session' );
	var App                = require( 'App' );
	var startsWith         = require( 'common/helpers/startsWith' );
	var VideoResourceModel = require( 'videoPlayer/models/VideoResourceModel' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.RelatedVideos = Backbone.CFCollection.extend( {

			'model' : VideoResourceModel,

			'path'  : 'SearchService',

			'initialize' : function ( models, options ) {
				_.extend( this, options );
			},

			'getReadOptions' : function () {
				return {
					'method' : 'RespondSearchAPI',
					'args'   : {
						'persId'     : Session.personnelId(),
						'start'      : 0,
						'rows'       : 24,
						'searchType' : 'RelatedContent',
						'searchData' : this.tags.join( ',' ),
						'sort'       : 'created desc'
					}
				};
			},

			'parse' : function ( response ) {
				// Removed first index in the array which is
				// not part of the data.
				var segments = _.rest( response );

				return _.filter( segments, function ( segment ) {

					var isArchived = startsWith( segment.ContentName, 'Archive:' );

					// exclude current segment and archived videos
					if ( segment.ContentId !== this.id && !isArchived ) {
						return segment;
					}

				}.bind( this ) );
			}

		} );

		var API = {

			'getRelatedVideos' : function ( content ) {
				var defer = App.Deferred();

				var relatedVideos = new Entities.RelatedVideos( [ ], {
					'id'   : content.id,
					'tags' : content.get( 'Tags' )
				} );

				relatedVideos.fetch( {

					'success' : function () {
						defer.resolve( relatedVideos );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching related videos' ) );
					}

				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'videoPlayer:relatedVideos', function ( content ) {
			return API.getRelatedVideos( content );
		} );

	} );

} );
