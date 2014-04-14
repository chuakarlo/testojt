// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var $ = require( 'jquery' );
	var _ = require( 'underscore' );

	var App      = require( 'App' );
	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );

	var ContentModel = require( 'videoPlayer/models/ContentModel' );

	App.module( 'VideoPlayer.Controller', function ( Controller ) {

		Controller.Show = {

			'videoAndResources' : function ( videoId ) {
				var licenseType = [ 0, 1, 200, 300 ];

				var videoContentRequests = {
					'path' : 'com.schoolimprovement.pd360.dao.ContentService',
					'method' : 'getContentByContentIdAndLicenseTypes',
					'args' : {
						'contId' : videoId,
						'licTypes' : licenseType
					}
				};

				var getVideoInfo = Remoting.fetch( videoContentRequests );

				$.when( getVideoInfo ).done( function ( response ) {

					var videoModel = new ContentModel( _.first( response ) );

					var relatedVideosRequest = {
						'path' : 'com.schoolimprovement.pd360.dao.RespondService',
						'method' : 'relatedVideos',
						'args' : {
							'ContentId' : videoModel.id
						}
					};

					var questionsRequest = {
						'path' : 'com.schoolimprovement.pd360.dao.ContentService',
						'method' : 'getQuestionsWithAnswers',
						'args' : {
							'persId' : Session.personnelId(),
							'ContentId' : videoModel.id
						}
					};

					var requests = [ relatedVideosRequest, questionsRequest ];
					var fetchingData = Remoting.fetch( requests );

					$.when( fetchingData ).done( function ( response ) {

						var layout = new App.VideoPlayer.Views.PageLayout( { 'model' : videoModel } );
						App.content.show( layout );

						var relatedVideos = response[ 0 ].slice( 1 );
						var questions     = response[ 1 ];

						// Videojs player view
						var videoPlayerView = new App.VideoPlayer.Views.VideoPlayerView( { 'model' : videoModel } );
						layout.playerRegion.show( videoPlayerView );

					} );

				} );

			},

		};

	} );

} );
