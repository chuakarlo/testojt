define( function ( require ) {
	'use strict';

	var _      = require( 'underscore' );
	var moment = require( 'moment' );

	require( 'moment-timezone' );
	require( 'timezone' );

	var App    = require( 'App' );
	var config = require( 'config' ).questions;

	App.module( 'VideoPlayer.Controller', function ( Controller ) {

		Controller.Filter = {

			// Logic to show which type of questions.
			'filterQuestions' : function ( questions, options ) {
				options = _.extend( config, options );

				var showFollowup = false;

				function timeDiff ( time ) {
					var now = moment().tz( options.timezone ).format( 'MMMM D, YYYY H:mm:ss' );
					var diff = moment( now ).diff( moment( time ), options.unit );

					return diff;
				}

				return _.filter( questions, function ( question ) {
					if ( !showFollowup &&
						question.Created !== '' &&
						question.QuestionTypeId === 1 &&
						timeDiff( question.Created ) >= options.duration ) {

						showFollowup = true;
					}

					// If time to showFollowup is true and question is of type follow-up questions then return question.
					// If time to showFollowup is false and question is a reflection and yet it is not submitted then return question.
					if ( ( showFollowup && question.QuestionTypeId === 2 ) ||
						( !showFollowup && question.QuestionTypeId === 1 && question.Created === '' ) ) {
						return question;
					}

				} );
			}

		};

	} );

} );
