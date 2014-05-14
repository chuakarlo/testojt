define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var AuthRouter = require( 'AuthRouter' );

	App.module( 'VideoPlayer', function ( VideoPlayer ) {

		require( 'common/entities/Queue' );
		require( 'common/views' );
		require( 'videoPlayer/config' );
		require( 'videoPlayer/entities/Entities' );
		require( 'videoPlayer/views/Views' );
		require( 'videoPlayer/controllers/ShowController' );
		require( 'videoPlayer/controllers/ShareController' );

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

			'showShareDialog' : function ( model ) {
				VideoPlayer.Controller.Show.showShareVideoDialog( model );
			},

			'shareVideo' : function ( shareTargets ) {
				return VideoPlayer.Controller.Share.shareVideo( shareTargets );
			}

		};

		App.vent.on( 'videoPlayer:showShareDialog', function ( model ) {
			API.showShareDialog( model );
		} );

		App.reqres.setHandler( 'videoPlayer:share:video', function ( shareTargets ) {
			return API.shareVideo( shareTargets );
		} );

		App.addInitializer( function () {
			new VideoPlayer.Router( {
				'controller' : API
			} );
		} );

	} );

} );
