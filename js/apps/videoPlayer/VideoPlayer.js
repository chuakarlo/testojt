define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var AuthRouter = require( 'AuthRouter' );

	var VideoPlayerController = require( 'videoPlayer/controllers/AppController' );

	App.module( 'VideoPlayer', function ( VideoPlayer ) {

		VideoPlayer.Router = AuthRouter.extend( {
			'appRoutes' : {
				'resources/video-player' : 'showVideoPlayer'
			}
		} );

		var API = {
			// TODO: error handling
			'showVideoPlayer' : function () {
				App.request( 'pd360:hide' );
				var controller = new VideoPlayerController( {
					'App' : App
				} );
				controller.showDefault();
			}
		};

		App.addInitializer( function () {
			new VideoPlayer.Router( {
				'controller' : API
			} );
		} );

	} );

} );
