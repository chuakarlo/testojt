define( function ( require ) {
	'use strict';

	return function () {

		var Marionette = require( 'marionette' );
		var App        = require( 'App' );
		var AuthRouter = require( 'AuthRouter' );

		var VideoUploaderView = require( 'videoUploader/views/VideoUploaderView' );

		App.module( 'VideoUploader', function ( Mod ) {

			// configure communities routes
			Mod.Router = AuthRouter.extend( {

				'appRoutes' : {
					'resources/videouploader' : 'showVideoUploader'
				}

			} );

			var Controller = Marionette.Controller.extend( {

				'showVideoUploader' : function () {
					// check if pd360 swf is loaded
					var pd360Loaded = App.request( 'pd360:loaded' );

					// show a loading view while we wait
					App.content.show( new App.Common.LoadingView() );

					// when loading is complete, show the community header and navigate to flash page
					App.when( pd360Loaded ).done( function () {

						App.content.show( new VideoUploaderView() );

						App.request( 'pd360:navigate', 'videos', 'videosUserUploadedVideo' );
					} );

				}

			} );

			Mod.showController = new Controller();

			App.addInitializer( function () {

				new Mod.Router( {
					'controller' : Mod.showController
				} );
			} );

		} );

	};

} );
