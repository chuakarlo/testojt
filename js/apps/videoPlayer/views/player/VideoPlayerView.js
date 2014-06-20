define( function ( require ) {
	'use strict';

	require( 'moment-timezone' );
	require( 'timezone' );

	var $          = require( 'jquery' );
	var moment     = require( 'moment' );
	var _          = require( 'underscore' );
	var videojs    = require( 'videojs' );
	var Marionette = require( 'marionette' );

	// Video player plugins
	require( 'videoPlayer/plugins/captionToggle' );
	require( 'videoPlayer/plugins/videoOverlay' );
	require( 'videoPlayer/plugins/videoReplay' );
	require( 'videoPlayer/plugins/staticDisplay' );

	var App    = require( 'App' );
	var config = App.request( 'videoPlayer:config' );
	var getConfig = require( 'common/helpers/getConfig' );

	var template = require( 'text!videoPlayer/templates/player/playerItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'id' : 'vjs-cont',

		'templateHelpers' : {

			'videoUrl' : function () {
				var url;

				if ( !this.Uploaded ) {
					var bitrates    = ',304,552,800,1152,1552,1952,2448,';
					var extension   = '.mp4.csmil/master.m3u8';
					var folder      = this.FileName.split( '.' )[ 0 ];
					var file        = this.FileName.split( '.' )[ 0 ] + '_';
					var contentType = { '3' : 'PD360', '6' : 'CC360' };

					// set video base URL
					url = 'http://schoolimp-vh.akamaihd.net/i/PD360/media/video/';
					url += contentType[ this.ContentTypeId ] + '/';
					url += this.SKU + '/';
					url += folder + '/';
					url += file + bitrates + extension;
				} else {
					url = getConfig( 'CDNURL' ) + '/PD360/media/video/ugc/' + this.FileName;
				}

				return url;
			},

			'getCC' : function () {
				var url         = 'PD360/media/video/';
				var folder      = this.FileName.split( '.' )[ 0 ];
				var file        = folder;
				var contentType = { '3' : 'PD360', '6' : 'CC360' };

				url += contentType[ this.ContentTypeId ] + '/';
				url += this.SKU + '/';
				url += folder + '/';
				url += file + '.vtt';

				return url;
			}

		},

		'initialize' : function () {
			videojs.options.flash.swf = 'js/libs/videojs/video-js.swf';

			this.listenTo( this, 'show', this.initializePlayer );
			this.listenTo( this, 'afterPlayerInit', this.initPlugins );
			this.listenTo( this, 'afterPlayerInit', this.startTracking );
		},

		'initializePlayer' : function () {
			var self = this;

			var player = videojs( 'video-content', {
				'controls'  : true,
				'autoplay'  : true,
				'techOrder' : [ 'flash', 'html5' ]
			}, function () {
				// Bug fix for defect #5187 : CC button flashes on IE.
				this.controlBar.captionsButton.hide();
				this.controlBar.captionsButton.el().setAttribute( 'aria-pressed', 'true' );

				// Check if flash is supported or if we're in Safari browser so
				// volume() won't throw an error if flash plugin or native hls player isn't available.
				if ( videojs.Flash.isSupported() || $.browser.safari ) {
					// Bug in flash player where volume returns 0
					// but actual video has sound and ui shown is minimum.
					// Manually set player volume to correct volume ui.
					this.volume( 0.5 );
				}
				this.loadingSpinner.show();
				this.controlBar.addChild( 'videoReplay' );
				// Make sure custom control is hidden in mobile devices.
				if ( self.isMobile() ) {
					this.removeChild( 'loadingSpinner' );
					this.controlBar.hide();
				}

			} );

			player.on( 'timeupdate', function removeSpinner () {
				// Bug fix to remove loading spinner in Safari when video starts playing.
				if ( player.currentTime() > 1 ) {
					player.removeChild( 'loadingSpinner' );
					player.off( 'timeupdate', removeSpinner );
				}
			} );

			player.on( 'loadedmetadata', function () {
				var now = moment().tz( 'MST7MDT' ).format( 'MMMM D, YYYY H:mm:ss A' );

				// set model's start viewing date for tracking
				this.model.set( 'BeganViewingDate', now );

				// this content has no segment length attribute,
				// use videojs to determine the segment duration
				this.model.set( 'SegmentLengthInSeconds', player.duration() );
			}.bind( this ) );

			this.trigger( 'afterPlayerInit', player );

			var data = {
				'player' : player,
				'model'  : this.model
			};

			App.vent.trigger( 'videoPlayer:playerView:init', data );
		},

		'initPlugins' : function ( player ) {
			// Closed caption plugin
			player.ccToggle();

			if ( !this.model.get( 'limited' ) ) {
				// Show replay button at end of video
				player.videoReplay();
			} else {
				// Show 45 second video duration static display
				player.staticDisplay( {
					'timeToShow'   : config.video.previewLimit,
					'imageUrl'     : getConfig( 'contentThumbnailPath' ) + this.model.get( 'ImageURL' ),
					'imageOpacity' : 0.5,
					'imageHeight'  : '100%',
					'imageWidth'   : '100%',
					'overlayText'  : 'In order to watch the entire video segment, you must have an active content license.<br>For assistance or to learn more, please call 855-337-7500.'
				} );
			}
		},

		'startTracking' : function ( player ) {
			if ( !this.model.get( 'limited' ) && !this.model.get( 'Uploaded' ) ) {
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
			}
		},

		'isMobile' : function () {
			return $.browser.mobile || $.browser.ipad;
		}

	} );

} );
