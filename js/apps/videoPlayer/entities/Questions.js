define( function ( require ) {
	'use strict';

	var $      = require( 'jquery' );
	var _      = require( 'underscore' );
	var moment = require( 'moment' );

	require( 'moment-timezone' );
	require( 'timezone' );

	var App      = require( 'App' );
	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );

	var config = require( 'config' ).questions;

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.VideoQuestions = {

			'setQuestions' : function ( questions, options ) {
				options = _.extend( config, options );

				function timeDiff ( time ) {
					var now = moment().tz( options.timezone ).format( 'MMMM D, YYYY H:mm:ss' );
					return moment( now ).diff( moment( time ), options.unit );
				}

				_.each( questions, function ( question ) {
					if ( !this.showFollowup &&
						question.QuestionTypeId === 1 &&
						question.Created !== '' ) {

						this.reflectionSummary = true;
						this.followupTime      = timeDiff( question.Created );

						if ( this.followupTime >= options.duration ) {
							this.followupTime      = 0;
							this.showFollowup      = true;
							this.reflectionSummary = false;
						}
					}

					if ( this.showFollowup &&
						question.QuestionTypeId === 2 &&
						question.Created !== '' ) {

						this.showFollowup      = false;
						this.reflectionSummary = false;
						this.followupSummary   = true;
					}
				}.bind( this ) );
			},

			'followupTime'      : 0,

			'showFollowup'      : false,

			'reflectionSummary' : false,

			'followupSummary'   : false

		};

		var API = {

			'getQuestions' : function ( videoId ) {
				var defer = $.Deferred();

				var request = {
					'path'   : 'com.schoolimprovement.pd360.dao.ContentService',
					'method' : 'getQuestionsWithAnswers',
					'args'   : {
						'persId'    : Session.personnelId(),
						'ContentId' : videoId
					}
				};

				var getQuestions = Remoting.fetch( request );

				App.when( getQuestions ).done( function ( response ) {
					var questions = response[ 0 ] || [ ];

					Entities.VideoQuestions.setQuestions( questions );
					defer.resolve( questions );
				} ).fail( function () {
					defer.reject( new Error( 'Error fetching questions resources.' ) );
				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'vq:fetch', function ( videoId ) {
			return API.getQuestions( videoId );
		} );

	} );

} );
