define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var videojs    = require( 'videojs' );
	var Marionette = require( 'marionette' );

	require( 'videoPlayer/plugins/captionToggle' );

	var template = require( 'text!videoPlayer/templates/player/playerItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'templateHelpers' : {

			'videoUrl' : function () {
				var url       = 'http://schoolimp-vh.akamaihd.net/i/PD360/media/video/';
				var bitrates  = ',304,552,800,1152,1552,1952,2448,';
				var extension = '.mp4.csmil/master.m3u8';
				var folder    = this.FileName.split( '.' )[ 0 ];
				var file      = this.FileName.split( '.' )[ 0 ] + '_';

				if ( this.ContentTypeId === 3 ) {
					url += 'PD360/';
				} else if ( this.ContentTypeId === 6 ) {
					url += 'CC360/';
				}

				url += this.SKU + '/';
				url += folder + '/';
				url += file + bitrates + extension;

				return url;
			}

		},

		'initialize' : function () {
			videojs.options.flash.swf = 'js/libs/videojs/video-js.swf';

			this.listenTo( this, 'show', this.initializePlayer );
			this.listenTo( this, 'afterPlayerInit', this.startTracking );
		},

		'initializePlayer' : function () {
			var player = videojs( 'video-content', {
				'controls'  : true,
				'autoplay'  : true,
				'techOrder' : [ 'flash', 'html5' ]
			}, function () {
				// Bug in flash player where volume returns 0
				// but actual video has sound and ui shown is minimum.
				// Manually set player volume to full to correct volume ui.
				this.volume( 0.5 );
				this.loadingSpinner.show();
				this.controlBar.show();
			} );

			player.ccToggle();

			this.trigger( 'afterPlayerInit', player );
		},

		'startTracking' : function ( player ) {
			// Here we'll track the player time manually
			// so we won't depend on the player element
			// being available in reporting video progress
			// when page navigates to a different route.
			player.on( 'timeupdate', function () {
				this.model.set( 'currentTime' , player.currentTime() );
			}.bind( this ) );

			this.bindPlayerEvents( player );
			this.bindPlayerCleanup( player, window );
		},

		// Tracked currentTime when video is paused and ended
		'bindPlayerEvents' : function ( player ) {

			player.on( 'pause', function () {
				this.model.save();
			}.bind( this ) );

			player.on( 'ended', function () {
				this.model.save();
			}.bind( this ) );

		},

		// Destroys player instance when page navigates to a different route
		'bindPlayerCleanup' : function ( player, element ) {

			$( element ).on( 'hashchange.bindPlayerCleanup', function () {
				// If currentTime is not equal 0 that means video was played, then
				// update progress before disposing player instance.
				if ( this.model.get( 'currentTime' ) !== 0) {
					this.model.save();
					this.model.set( 'currentTime', 0 );
				}
				player.dispose();
				$( element ).off( 'hashchange.bindPlayerCleanup' );
			}.bind( this ) );
		}

	} );

} );
