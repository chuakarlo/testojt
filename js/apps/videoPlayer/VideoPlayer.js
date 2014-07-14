define( function ( require ) {
	'use strict';

	return function () {

		var $        = require( 'jquery' );
		var Backbone = require( 'backbone' );

		var App        = require( 'App' );
		var AuthRouter = require( 'AuthRouter' );

		App.module( 'VideoPlayer', function ( VideoPlayer ) {

			require( 'common/entities/Queue' );
			require( 'videoPlayer/config' );
			require( 'videoPlayer/entities/Entities' );
			require( 'videoPlayer/views/Views' );
			require( 'videoPlayer/controllers/ShowController' );
			require( 'videoPlayer/plugins/parseParams' );

			VideoPlayer.Router = AuthRouter.extend( {
				'appRoutes' : {
					'resources/videos/:params'                      : 'showVideoPlayer',
					'resources/videos/:params(/:licenseId/:taskId)' : 'showVideoCourse'
				}
			} );

			var API = {

				'showVideoPlayer' : function ( params ) {
					App.request( 'pd360:hide' );
					VideoPlayer.Controller.Show.showVideo( App.request( 'videoPlayer:videoId' ) );
				},

				'showVideoCourse' : function ( videoId, licenseId, taskId ) {

					// check if the user has the license
					var hasLicense = App.request( 'user:licenses:hasLicense', licenseId );

					// show the video as part of a course
					if ( hasLicense ) {
						return VideoPlayer.Controller.Show.showVideoCourse( videoId, licenseId, taskId );
					}

					// play the video as normal
					App.navigate( 'resources/videos/' + videoId, {
						'trigger' : true,
						'replace' : true
					} );
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
				// can match the following:
				// resources/videos/12345
				// resources/videos/12345?uuv=1234 (can match more than just uuv)
				// resources/videos/12345/1234/1 (for videos that are part of a course task)
				return App.getCurrentRoute().match( /resources\/videos\/(\d+|\/)+(\?.*)?/ );
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
				} );
				// Emptying array
				videos = [ ];
			} );

			App.addInitializer( function () {
				new VideoPlayer.Router( {
					'controller' : API
				} );
			} );

		} );

	};

} );
