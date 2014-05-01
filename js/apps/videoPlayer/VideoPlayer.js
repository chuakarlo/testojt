define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var AuthRouter = require( 'AuthRouter' );

	var Vent = require( 'Vent' );

	App.module( 'VideoPlayer', function ( VideoPlayer ) {

		require( 'videoPlayer/views/Views' );
		require( 'videoPlayer/controllers/FilterController' );
		require( 'videoPlayer/controllers/ShowController' );
		require( 'videoPlayer/controllers/QueueController' );

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
			}

		};

		Vent.on( 'videoPlayer:showResources', function () {
			API.showAdditionalResources();
		} );

		Vent.on( 'videoPlayer:showShareDialog', function ( model ) {
			API.showShareDialog( model );
		} );

		Vent.on( 'videoPlayer:addContentToQueue', function ( model ) {
			API.addContentToQueue( model );
		} );

		Vent.on( 'videoPlayer:removeContentFromQueue', function ( model ) {
			API.removeContentFromQueue( model );
		} );

		App.addInitializer( function () {
			new VideoPlayer.Router( {
				'controller' : API
			} );
		} );

	} );

} );
