define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var AuthRouter = require( 'AuthRouter' );

	App.module( 'VideoPlayer', function ( VideoPlayer ) {

		require( 'videoPlayer/entities/Questions' );
		require( 'videoPlayer/views/Views' );
		require( 'videoPlayer/controllers/ShowController' );
		require( 'videoPlayer/controllers/QueueController' );
		require( 'videoPlayer/controllers/ShareController' );
		require( 'videoPlayer/entities/SearchResults' );

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

			'addContentToQueue' : function ( model ) {
				VideoPlayer.Controller.Queue.addContent( model );
			},

			'removeContentFromQueue' : function ( model ) {
				VideoPlayer.Controller.Queue.removeContent( model );
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

		App.vent.on( 'videoPlayer:addContentToQueue', function ( model ) {
			API.addContentToQueue( model );
		} );

		App.vent.on( 'videoPlayer:removeContentFromQueue', function ( model ) {
			API.removeContentFromQueue( model );
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
