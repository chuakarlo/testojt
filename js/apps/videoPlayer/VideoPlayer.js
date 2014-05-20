define( function ( require ) {
	'use strict';

	return function () {

		var Backbone   = require( 'backbone' );
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

			App.reqres.setHandler( 'videoPlayer:isVideosRoute', function () {
				return Backbone.history.fragment.match( /resources\/videos\/\d+$/g );
			} );

			var videos = [ ];

			App.vent.on( 'videoPlayer:playerView:init', function ( data ) {
				videos.push( data );
			} );

			// Videojs isn't single-page-app friendly.
			// When navigating away from video player page, dispose the
			// videojs instance to avoid errors on 'undefined' variables
			// after the video DOM element is removed.
			Backbone.history.on( 'route', function () {
				videos.forEach( function ( data, index ) {
					if ( data.player && data.player.el() ) {
						data.player.off( 'timeupdate' );
						data.player.stopTrackingProgress();

						if ( data.model.get( 'currentTime' ) > 0 ) {
							data.model.save();
						}

						setTimeout( function () {
							this.player.dispose();

							videos.splice( index );
						}.bind( data ), 500 );
					}
				} );
			} );

			App.addInitializer( function () {
				new VideoPlayer.Router( {
					'controller' : API
				} );
			} );

		} );

	};

} );
