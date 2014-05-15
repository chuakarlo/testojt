define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var videojs    = require( 'videojs' );
	var Marionette = require( 'marionette' );

	require( 'videoPlayer/plugins/captionToggle' );
	require( 'videoPlayer/plugins/nextVideoOverlay' );

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
			},

			'getCC' : function () {
				var url    = 'http://schoolimp-vh.akamaihd.net/i/PD360/media/video/';
				var folder = this.FileName.split( '.' )[ 0 ];
				var file   = folder + '_';
				if ( this.ContentTypeId === 3 ) {
					url += 'PD360/';
				} else if ( this.ContentTypeId === 6 ) {
					url += 'CC360/';
				}
				url += this.SKU + '/';
				url += folder + '/';
				url += file + '.vtt';

				return url;
			}
		},

		'initialize' : function () {
			videojs.options.flash.swf = 'js/libs/videojs/video-js.swf';

			this.listenTo( this, 'show', this.initializePlayer );
			this.listenTo( this, 'afterPlayerInit', this.startTracking );
			this.listenTo( this, 'afterPlayerInit', this.addPlugins );
		},

		'initializePlayer' : function () {
			var player = videojs( 'video-content', {
				'controls'  : true,
				'autoplay'  : true,
				'techOrder' : [ 'flash', 'html5' ]
			}, function () {
				// Check if flash is supported so,
				// volume() won't throw an error if flash player isn't available.
				if ( videojs.Flash.isSupported() ) {
					// Bug in flash player where volume returns 0
					// but actual video has sound and ui shown is minimum.
					// Manually set player volume to correct volume ui.
					this.volume( 0.5 );
					this.loadingSpinner.show();
					this.controlBar.show();
				}
				// Make sure custom control is hidden in mobile devices
				if ( videojs.IS_IOS ||
					videojs.IS_ANDROID ||
					videojs.IS_OLD_ANDROID ) {
					this.controlBar.hide();
				}
			} );

			this.trigger( 'afterPlayerInit', player );
		},

		'addPlugins' : function ( player ) {
			// Closed caption plugin
			player.ccToggle();

			if ( this.model.next ) {
				// Next video overlay plugin
				player.nextVideoOverlay( {
					imageUrl  : 'http://resources.pd360.com/PD360/media/thumb/' + this.model.next.get( 'ImageURL' ),
					clickUrl  : '#resources/videos/' + this.model.next.get( 'ContentId' ),
					startTime : this.model.get( 'SegmentLengthInSeconds' ) - 5,
					text      : this.model.next.get( 'ContentName' )
				} );
			}
		},

		'startTracking' : function ( player ) {
			this.trackPlayer( player );
			this.trackHashchange( player, window );
		},

		// Tracked currentTime when video is paused and ended
		'trackPlayer' : function ( player ) {
			// Here we'll track the player time manually
			// so we won't depend on the player element
			// being available in reporting video progress
			// when page navigates to a different route.
			player.on( 'timeupdate', function () {
				this.model.set( 'currentTime' , player.currentTime() );
			}.bind( this ) );

			player.on( 'pause', function () {
				this.model.save();
			}.bind( this ) );

			player.on( 'ended', function () {
				this.model.save();
			}.bind( this ) );
		},

		// Destroys player instance when page navigates to a different route
		'trackHashchange' : function ( player, element ) {
			$( element ).on( 'hashchange.videoPlayer', function () {
				player.off( 'timeupdate' );
				// If currentTime is not equal 0 that means video was played, then
				// update progress before disposing player instance.
				if ( this.model.get( 'currentTime' ) !== 0) {
					this.model.save();
					this.model.set( 'currentTime', 0 );
				}
				player.dispose();
				$( element ).off( 'hashchange.videoPlayer' );
			}.bind( this ) );
		}

	} );

} );
