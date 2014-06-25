define( function ( require ) {
	'use strict';

	return function () {

		var $        = require( 'jquery' );
		var Backbone = require( 'backbone' );

		var App        = require( 'App' );
		var AuthRouter = require( 'AuthRouter' );

		App.module( 'VideoPlayer', function ( VideoPlayer ) {

			require( 'common/entities/Queue' );
			require( 'common/views' );
			require( 'videoPlayer/config' );
			require( 'videoPlayer/entities/Entities' );
			require( 'videoPlayer/views/Views' );
			require( 'videoPlayer/controllers/ShowController' );
			require( 'videoPlayer/plugins/parseParams' );

			VideoPlayer.Router = AuthRouter.extend( {
				'appRoutes' : {
					'resources/videos/:params' : 'showVideoPlayer'
				}
			} );

			var API = {

				'showVideoPlayer' : function ( params ) {
					App.request( 'pd360:hide' );
					VideoPlayer.Controller.Show.showVideo( App.request( 'videoPlayer:videoId' ) );
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
				return App.getCurrentRoute().match( /resources\/videos\/\d+(\?.*)?$/ );
			} );

			App.reqres.setHandler( 'videoPlayer:urlParams', function () {
				var re = /(\d+)(\?.*)?$/;
				return re.exec( App.getCurrentRoute() );
			} );

			App.reqres.setHandler( 'videoPlayer:videoId', function () {
				return App.request( 'videoPlayer:urlParams' )[ 1 ];
			} );

			App.reqres.setHandler( 'videoPlayer:queryObject', function () {
				var queryObject = App.request( 'videoPlayer:urlParams' )[ 2 ];
				return queryObject ? $.parseParams( queryObject ) : { };
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
						//This fixes the issue in Android 4.2.2 native browser
						//where the video continues to play even
						//if in a different route.
						if ( $.browser.platform === 'android' ) {
							data.player.load();
						}

						data.player.off( 'timeupdate' );
						data.player.stopTrackingProgress();

						if ( data.model.get( 'currentTime' ) > 0 &&
							!data.model.get( 'Uploaded' ) ) {
							data.model.save();
						}

						setTimeout( function () {
							this.player.dispose();
						}.bind( data ), 500 );
					}
					// Emptying array
					videos = [ ];
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
