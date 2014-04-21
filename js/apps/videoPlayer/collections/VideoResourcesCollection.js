 define ( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	var VideoResourceModel = require( 'videoPlayer/models/VideoResourceModel' );

	return Backbone.Collection.extend( {

		'model'  : VideoResourceModel,

		'initialize' : function() {},

		'buildModels' : function ( model ) {

			var previewUrl = 'http://upload.content.pd360.com/PD360/media/';

			var resources = [
				{
					'previewPath'  : previewUrl + 'gb/' + model.GuidebookFileName,
					'downloadPath' : '/gb/' + model.GuidebookFileName,
					'thumbnail'    : '/img/guidebook.jpg'
				}, {
					'previewPath'  : '',
					'downloadPath' : '/mp3/' + model.AudioFileName,
					'thumbnail'    : '/img/audio.jpg'
				}, {
					'previewPath'  : previewUrl + 'transcripts/' + model.TranscriptFileName,
					'downloadPath' : '/transcripts/' + model.TranscriptFileName,
					'thumbnail'    : '/img/transcribe.jpg'
				}
			];
			return resources;
		},

		'resetCollection' : function ( model ) {
			var resources = this.buildModels( model );
			this.reset( resources );

			return this;
		}

	} );
} );
