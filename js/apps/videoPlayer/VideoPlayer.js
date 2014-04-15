define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var AuthRouter = require( 'AuthRouter' );

	var Vent = require( 'Vent' );

	App.module( 'VideoPlayer', function ( VideoPlayer ) {

		require( 'videoPlayer/views/Views' );
		require( 'videoPlayer/controllers/FilterController' );
		require( 'videoPlayer/controllers/ShowController' );

		VideoPlayer.Router = AuthRouter.extend( {
			'appRoutes' : {
				'resources/videos/:id' : 'showVideoPlayer'
			}
		} );

		var API = {

			'showVideoPlayer' : function ( videoId ) {
				App.request( 'pd360:hide' );
				VideoPlayer.Controller.Show.showVideo( videoId );
			},

			'showRelatedVideos' : function () {

			},

			'showAdditionalResources' : function () {

			}

		};

		Vent.on( 'videoPlayer:showRelated', function () {
			API.showRelatedVideos();
		} );

		Vent.on( 'videoPlayer:showResources', function () {
			API.showAdditionalResources();
		} );

		App.addInitializer( function () {
			new VideoPlayer.Router( {
				'controller' : API
			} );
		} );

	} );

} );
