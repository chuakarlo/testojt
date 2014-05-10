define( function ( require ) {
	'use strict';

	require( 'moment-timezone' );
	require( 'timezone' );

	var moment   = require( 'moment' );
	var _        = require( 'underscore' );
	var Backbone = require( 'filterable.collection' );

	var QuestionModel = require( 'videoPlayer/models/QuestionModel' );

	var config = require( 'config' ).questions;

	return Backbone.FilterableCollection.extend( {

		'model' : QuestionModel,

		'initialize' : function () {
			this.followupTime = 0;
			this.states = {
				'showReflection'    : true,
				'showFollowup'      : false,
				'reflectionSummary' : false,
				'followupSummary'   : false
			};
		},

		'getState' : function ( name ) {
			return this.states[ name ];
		},

		'getCurrentState' : function () {
			var currentState = '';

			_.each( Object.keys( this.states ), function ( state ) {
				if ( this.states[ state ] ) {
					currentState = state;
				}
			}.bind( this ) );

			return currentState;
		},

		'setState' : function ( name ) {
			_.each( Object.keys( this.states ), function ( state ) {
				this.states[ state ] = false;
			}.bind( this ) );

			this.states[ name ] = true;
		},

		'setQuestions' : function () {
			var questionType = 0;

			if ( this.getState( 'showReflection' ) ) {
				questionType = 1;
			} else if ( this.getState( 'showFollowup' ) ) {
				questionType = 2;
			}

			this.filter( function ( question ) {
				if ( question.get( 'QuestionTypeId' ) === questionType ) {
					return question;
				}
			} );
		},

		'setQuestionsState' : function ( options ) {
			options = _.extend( config, options );

			// get unanswered reflection question
			var reflection = this.findWhere( { 'QuestionTypeId' : 1, 'Created' : '' } );
			if ( reflection )  {
				this.setState( 'showReflection' );
				this.setQuestions();
				return;
			}

			this.some( function ( question ) {
				if ( question.get( 'QuestionTypeId' ) === 1 ) {
					var followupTime = this.getTimeDiff( question.get( 'Created' ), options );
					if ( followupTime >= options.duration ) {
						this.setState( 'showFollowup' );
					} else {
						this.setState( 'reflectionSummary' );
						// break the loop if we need to show reflection summary
						return true;
					}
				}
			}.bind( this ) );

			// find unanswered follow-up question
			var followup = this.findWhere( { 'QuestionTypeId' : 2, 'Created' : '' } );

			// if we can show follow-up questions and all follow-up were answered
			// then show follow-up summary
			if ( !followup && this.getState( 'showFollowup' ) ) {
				this.setState( 'followupSummary' );
			}

			this.setQuestions();
		},

		'getTimeDiff' : function ( time, options ) {
			options = _.extend( config, options );

			var now = moment().tz( options.timezone ).format( 'MMMM D, YYYY H:mm:ss' );
			return moment( now ).diff( moment( time ), options.unit );
		},

		// get the largest diff time of submitted reflection questions
		'getFollowupTime' : function () {
			var largestDiff = 0;

			_.each( this._original, function ( question ) {
				if ( question.get( 'QuestionTypeId' ) === 1 &&
					question.get( 'Created' ) !== '' ) {
					var temp = this.getTimeDiff( question.get( 'Created' ) );
					if ( temp > largestDiff ) {
						largestDiff = temp;
					}
				}
			}.bind( this ) );

			return largestDiff;
		}

	} );

} );
