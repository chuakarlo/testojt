define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var AuthRouter = require( 'AuthRouter' );

	App.module( 'VideoPlayer', function ( VideoPlayer ) {

		require( 'common/views' );
		require( 'videoPlayer/views/Views' );
		require( 'videoPlayer/controllers/FilterController' );
		require( 'videoPlayer/controllers/ShowController' );
		require( 'videoPlayer/controllers/QueueController' );
		require( 'videoPlayer/controllers/SearchController' );
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

			'searchPeopleAndGroups' : function ( filter ) {
				return VideoPlayer.Controller.Search.searchPeopleAndGroups( filter );
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

		App.reqres.setHandler( 'videoPlayer:searchPeopleAndGroups', function ( filter ) {
			return API.searchPeopleAndGroups( filter );
		} );

		App.addInitializer( function () {
			new VideoPlayer.Router( {
				'controller' : API
			} );
		} );

	} );

} );
