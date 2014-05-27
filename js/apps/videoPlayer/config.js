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
		},

		'slick' : {
			'slidesToShow'   : 4,
			'slidesToScroll' : 4,
			'arrows'         : true,
			'slide'          : 'li',
			'slickWidth'     : 1140,
			'useCSS'         : false,
			'responsive'     : [ {
				'breakpoint' : 1100,
				'settings'   : {
					'slidesToScroll' : 2,
					'touchThreshold' : 10
				}
			}, {
				'breakpoint' : 450,
				'settings'   : {
					'slidesToScroll' : 1,
					'touchThreshold' : 10
				}
			} ]
		}
	};

	App.reqres.setHandler( 'videoPlayer:config', function () {
		return configs;
	} );

} );
