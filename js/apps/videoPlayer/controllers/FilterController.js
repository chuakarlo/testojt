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
			'setQuestions' : function ( questions, options ) {
				options = _.extend( config, options );

				var showFollowup = false;

				function timeDiff ( time ) {
					var now = moment().
						tz( options.timezone ).
						format( 'MMMM D, YYYY H:mm:ss' );

					var diff = moment( now ).
						diff( moment( time ), options.unit );

					return diff;
				}

				// empty = no answer
				function emptyReflection ( question ) {
					return question.QuestionTypeId === 1 && question.Created === '';
				}

				function emptyFollowup ( question ) {
					return question.QuestionTypeId === 2 && question.Created === '';
				}

				return _.filter( questions, function ( question ) {
					if ( !showFollowup &&
						!emptyReflection( question ) &&
						timeDiff( question.Created ) >= options.duration ) {
						showFollowup = true;
					}

					if ( ( showFollowup && emptyFollowup( question ) ) ||
						( !showFollowup && emptyReflection( question ) ) ) {
						return question;
					}

				} );
			}

		};

	} );

} );
