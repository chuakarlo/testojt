define( function ( require ) {
	'use strict';
	
	var _      = require( 'underscore' );
	var moment = require( 'moment' );

	require( 'moment-timezone' );
	require( 'timezone' );

	var App = require( 'App' );

	var settings = {
		'timeDuration' : 3,
		'timezone' : 'MST7MDT',
		'duration' : 'seconds'
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
					var now = moment().tz( options.timezone ).format( 'MMMM, D YYYY h:mm:ss' );
					var diff = moment( now ).diff( moment( dateSubmitted ), options.duration );

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
