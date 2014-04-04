define ( function ( require ) {
	'use strict';

	var _                 = require( 'underscore' );
	var Backbone          = require( 'backbone' );

	var Remoting          = require( 'Remoting' );
	var RelatedVideoModel = require( 'videoPlayer/models/RelatedVideoModel' );
	var hhmmssFormat      = require( 'videoPlayer/utils/toHHMMSSFormat' );

	return Backbone.Collection.extend( {

		//use as path for request
		'url'    : 'com.schoolimprovement.pd360.dao.RespondService',

		'method' : 'relatedVideos',

		'model'  : RelatedVideoModel,

		'fetchRelatedVid' : function ( request, options ) {
			options        = options || {};
			request.path   = this.url;
			request.method = this.method;

			var fetchingRequest = Remoting.fetch( request );

			if ( options.success ) {
				fetchingRequest.then( options.success );
			}

			if ( options.error ) {
				fetchingRequest.fail( options.error );
			}

			if( options.reset ){
				fetchingRequest.done( _.bind( this.resetRelatedVideoCollection, this ) );
			}

			return fetchingRequest;
		},

		'resetRelatedVideoCollection' : function ( relatedVideosResult ) {
			var relatedVideos = [];
			var url           = 'http://resources.pd360.com/PD360/media/thumb/';
			/**
			 * Returns the rest of the elements of response data.
			 * Starts at index 1, since the 1st element is statistics.
			 */
			relatedVideos = _.rest( relatedVideosResult[ 0 ], 1 );

			_.each( relatedVideos, function ( relatedVideo ) {
				//this is the path to access the thumbnail for now since no cdn.
				relatedVideo.url = url + relatedVideo.ImageURL;
				//convert sec to hh:mm:ss
				relatedVideo.duration = hhmmssFormat( relatedVideo.SegmentLengthInSeconds );
			} );

			this.reset( relatedVideos );
			this.trigger( 'custom:sync', relatedVideos.length );
		}
	} );
} );
