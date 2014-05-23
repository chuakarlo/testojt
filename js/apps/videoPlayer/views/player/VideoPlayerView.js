define( function ( require ) {
	'use strict';

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

	var template = require( 'text!videoPlayer/templates/player/playerItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'id' : 'vjs-cont',

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
				var url    = 'http://resources.pd360.com/PD360/media/video/';
				var folder = this.FileName.split( '.' )[ 0 ];
				var file   = folder;
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
				// Check if flash is supported so,
				// volume() won't throw an error if flash player isn't available.
				if ( videojs.Flash.isSupported() ) {
					// Bug in flash player where volume returns 0
					// but actual video has sound and ui shown is minimum.
					// Manually set player volume to correct volume ui.
					this.volume( 0.5 );
				}
				this.loadingSpinner.show();
				this.controlBar.show();
				this.controlBar.addChild( 'videoReplay' );

				// Make sure custom control is hidden in mobile devices.
				if ( self.isMobile() ) {
					this.controlBar.hide();
					// Removing spinner due to bug in IOS/Android
					// where spinner doesn't hide after first play.
					this.removeChild( 'loadingSpinner' );
				}

			} );

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

			if ( !this.model.get( 'limited' ) && this.model.next ) {
				// Show replay button at end of video
				player.videoReplay();
				// Next video overlay
				player.videoOverlay( {
					'imageUrl'     : 'http://resources.pd360.com/PD360/media/thumb/' + this.model.next.get( 'ImageURL' ),
					'imageOpacity' : 0.75,
					'clickUrl'     : '#resources/videos/' + this.model.next.get( 'ContentId' ),
					'overlayText'  : '<div id="video-up-next"><p id="vjs-p-overlay">Up Next:</p><p id="vjs-title-overlay">' + this.model.next.get( 'ContentName' ) + '</p></div>'
				} );
			} else {
				player.staticDisplay( {
					'timeToShow'   : config.video.previewLimit,
					'imageUrl'     : 'http://resources.pd360.com/PD360/media/thumb/' + this.model.get( 'ImageURL' ),
					'imageOpacity' : 0.5,
					'imageHeight'  : '100%',
					'imageWidth'   : '100%',
					'overlayText'  : 'In order to watch the entire video segment, you must have an active content license.<br>For assistance or to learn more, please call 855-337-7500.'
				} );
			}
		},

		'startTracking' : function ( player ) {
			if ( !this.model.get( 'limited' ) ) {
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
			return videojs.IS_IOS ||
				videojs.IS_ANDROID ||
				videojs.IS_OLD_ANDROID;
		}

	} );

} );
