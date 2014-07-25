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
			// Question auto-save variables
			'autosaveInterval' : 5000, // in milliseconds
			'autosaveInactive' : 9000, // when user is not editing,
			'saveProgress'     : 'Saving...',
			'saveSuccess'      : '<i class = "fa fa-check"></i> Auto-saved',
			'saveError'        : '<i class = "fa fa-times"></i> Auto-save interrupted. Check your internet connection.'
		},

		'video' : {
			'previewLimit' : 45 // in seconds,
		}
	};

	App.reqres.setHandler( 'videoPlayer:config', function () {
		return configs;
	} );

} );
