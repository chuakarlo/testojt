define( function ( require ) {
	'use strict';
	
	var _      = require( 'underscore' );
	var moment = require( 'moment' );

	require( 'moment-timezone' );
	require( 'timezone' );

	var App = require( 'App' );

	var settings = {
		'timeDuration' : 10,
		'timezone' : 'MST7MDT',
		'duration' : 'minutes'
	};

	var type = {
		'Reflection' : 1,
		'Followup' : 2
	};

	App.module( 'VideoPlayer.Controller', function( Controller ) {
		
		Controller.Filter = {
			
			'filterQuestions' : function( questions, options ) {
				options = _.extend( settings, options );

				var showTypes = type.Reflection; // default questions to show
				// Get created date for reflections questions.
				// Assuming first question is a reflection.
				var dateSubmitted = questions[ 0 ].Created;
				
				if ( dateSubmitted !== '' ) {
					// Adjust dateSubmitted to same timezone
					var normalized = moment( dateSubmitted )
					 .tz( options.timezone )
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
