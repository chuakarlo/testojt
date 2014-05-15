define( function ( require ) {
	'use strict';

	var $ = require( 'jquery' );

	var App      = require( 'App' );
	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );

	App.module( 'VideoPlayer.Questions', function ( Questions ) {

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
					defer.resolve( response[ 0 ] || [ ] );
				} ).fail( function () {
					defer.reject( new Error( 'Error fetching questions resources.' ) );
				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'videoPlayer:questions', function ( videoId ) {
			return API.getQuestions( videoId );
		} );

	} );

} );
