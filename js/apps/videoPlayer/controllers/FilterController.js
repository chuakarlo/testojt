define( function ( require ) {
	'use strict';

	var _      = require( 'underscore' );
	var moment = require( 'moment' );

	require( 'moment-timezone' );
	require( 'timezone' );

	var App = require( 'App' );

	// Filter settings for reflection/followup questions
	var settings = {
		'timeDuration' : 10,
		'timezone' : 'MST7MDT',
		'duration' : 'minutes'
	};

	// Question type id
	var type = {
		'Reflection' : 1,
		'Followup' : 2
	};

	App.module( 'VideoPlayer.Controller', function( Controller ) {

		Controller.Filter = {

			// Logic to show which type of questions.
			// `settings` is used to control which type to show.
			'filterQuestions' : function( questions, options ) {
				options = _.extend( settings, options );

				var showTypes = type.Reflection; // default questions to show

				if ( questions[ 0 ].Created !== '' ) {
					// Reformat date to 12-hour format.
					var normalized = moment( questions[ 0 ].Created )
					 .format( 'MMMM D, YYYY h:mm:ss' );

					var now = moment()
					 .tz( options.timezone )
					 .format( 'MMMM D, YYYY h:mm:ss' );

					var diff = moment( now )
					 .diff( normalized, options.duration );

					if ( diff >= options.timeDuration ) {
						showTypes = type.Followup;
					}
				}

				return _.filter( questions, function( question ) {
					return question.QuestionTypeId === showTypes;
				} );

			}

		};

	} );

} );
