define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	var configs = {
		// Settings for switching reflections to followup questions.
		'questions' : {
			'message'  : 'Follow-up questions are available 72 hours after completion of reflection questions.',
			'duration' : 72,
			'timezone' : 'MST7MDT',
			'unit'     : 'hours',

			'autosaveInterval' : 5000, // in milliseconds
			'autosaveInactive' : 9000 // when user is not editing
		},

		'video' : {
			'previewUrl' : 'http://upload.content.pd360.com/PD360/media/',

			'previewLimit' : 45 // in seconds,
		}
	};

	App.reqres.setHandler( 'videoPlayer:config', function () {
		return configs;
	} );

} );
