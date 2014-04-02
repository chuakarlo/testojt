define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var App             = require( 'App' );

	var VideoPlayerController = require( 'videoPlayer/controllers/AppController' );

	App.module( 'VideoPlayer', function ( VideoPlayer ) {

		// load sub apps
		// require( './controllers/showController' );

		VideoPlayer.Router = Marionette.MiddlewareRouter.extend( {
			'appRoutes' : {
				'resources/video-player' : 'showVideoPlayer'
			}
		} );

		var API = {
			// TODO: error handling
			'showVideoPlayer' : function ( error, results, args ) {
				if ( !error ) {
					var controller = new VideoPlayerController( {
						'App' : App
					} );
					controller.showDefault();
				}
			}
		};

		App.addInitializer( function () {
			new VideoPlayer.Router( {
				'controller' : API
			} );
		} );

	} );

} );