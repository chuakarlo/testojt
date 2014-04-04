 define ( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );

	var Remoting           = require( 'Remoting' );
	var VideoResourceModel = require( 'videoPlayer/models/VideoResourceModel' );

	return Backbone.Collection.extend( {

		'model'  : VideoResourceModel,

		'url'    : 'com.schoolimprovement.pd360.dao.ContentService',

		'method' : {
			'getResources' : 'getContentByContentIdAndLicenseTypes'
		},

		'initialize' : function () {},

		'fetch' : function ( request, options ) {

			options = options || {};

			request.path   = this.url;
			request.method = this.method.getResources;

			var fetchingRequest = Remoting.fetch( request );

			if( options.success ) {
				fetchingRequest.then( options.success );
			}

			if( options.error ) {
				fetchingRequest.fail( options.error );
			}

			if ( options.reset ) {
				fetchingRequest.done( _.bind( this.resetCollection, this ) );
			}

			return fetchingRequest;

		},

		'buildModels' : function ( model ) {
			var previewUrl = 'http://upload.content.pd360.com/PD360/media/';

			var resources = [
				{
					'previewPath'  : previewUrl + 'gb/' + model[ 'GuidebookFileName' ],
					'downloadPath' : '/gb/' + model[ 'GuidebookFileName' ],
					'thumbnail'    : '/img/guidebook.jpg'
				}, {
					'previewPath'  : previewUrl + 'mp3/' + model[ 'AudioFileName' ],
					'downloadPath' : '/mp3/' + model[ 'AudioFileName' ],
					'thumbnail'    : '/img/audio.jpg'
				}, {
					'previewPath'  : previewUrl + 'transcripts/' + model[ 'TranscriptFileName' ],
					'downloadPath' : '/transcripts/' + model[ 'TranscriptFileName' ],
					'thumbnail'    : '/img/transcribe.jpg'
				}
			];

			return resources;
		},

		'resetCollection' : function ( collection ) {
			var resources =  this.buildModels( _.first( collection ) );
			this.reset( resources );
		}

	} );
} );
