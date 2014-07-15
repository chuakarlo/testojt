define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var videojs    = require( 'videojs' );
	var Marionette = require( 'marionette' );

	// Video player plugins
	require( 'videoPlayer/plugins/captionToggle' );
	require( 'videoPlayer/plugins/videoOverlay' );
	require( 'videoPlayer/plugins/videoReplay' );
	require( 'videoPlayer/plugins/staticDisplay' );

	var App       = require( 'App' );
	var config    = App.request( 'videoPlayer:config' );
	var getConfig = require( 'common/helpers/getConfig' );
	var utils     = require( 'videoPlayer/utils/utils' );

	var template = require( 'text!videoPlayer/templates/player/playerItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'id' : 'vjs-cont',

		'templateHelpers' : {

			'videoUrl' : function () {
				var contentType = this.ContentTypeId;
				var url;

				// user uploaded video
				if ( this.Uploaded ) {
					return getConfig( 'uuServers' ) + this.FileName;
				}

				// regular pd/common core content - adaptive streaming
				if ( contentType === 6 || contentType === 3 ) {
					var bitrates     = ',304,552,800,1152,1552,1952,2448,';
					var extension    = '.mp4.csmil/master.m3u8';
					var folder       = this.FileName.split( '.' )[ 0 ];
					var file         = this.FileName.split( '.' )[ 0 ] + '_';
					var contentTypes = {
						'3' : 'PD360',
						'6' : 'CC360'
					};

					// set video base URL
					url = 'http://schoolimp-vh.akamaihd.net/i/PD360/media/video/';
					url += contentTypes[ this.ContentTypeId ] + '/';
					url += this.SKU + '/';
					url += folder + '/';
					url += file + bitrates + extension;

					return url;
				}

				// course - hardcoded to standard definition for now
				var base = '//upload.content.pd360.com/PD360/media/video/SD/';

				return base + this.FileName;
			},

			'getCC' : function () {
				var url         = 'subtitles/';
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

		'setAutoPlay' : function () {
			return !utils.isMobile();
		},

		'initializePlayer' : function () {

			var player = videojs( 'video-content', {
				'controls'  : true,
				'autoplay'  : this.setAutoPlay(),
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
				if ( utils.isMobile() ) {
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

				if ( this.model.next ) {

					if ( !utils.isMobile() ) {
						player.videoOverlay( {
							'imageUrl'     : 'http://resources.pd360.com/PD360/media/thumb/' + this.model.next.get( 'ImageURL' ),
							'imageOpacity' : 0.75,
							'clickUrl'     : '#resources/videos/' + this.model.next.get( 'ContentId' ),
							'overlayText'  : '<div id="video-up-next"><p id="vjs-p-overlay">Up Next:</p><p id="vjs-title-overlay">' + this.model.next.get( 'ContentName' ) + '</p></div>'
						} );
					}
				}
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

		'startTrackingInterval' : function () {
			this.trackingInterval = setInterval( _.bind( function () {
				this.model.set( 'SecondsCompleted', this.model.get( 'SecondsCompleted' ) + 1 );
			}, this ), 1000 );
		},

		'clearTrackingInterval' : function () {
			clearInterval( this.trackingInterval );
			this.trackingInterval = null;
		},

		'startTracking' : function ( player ) {
			if ( !this.model.get( 'limited' ) && !this.model.get( 'Uploaded' ) ) {
				this.model.set( 'SecondsCompleted', 0 );
				this.trackingInterval = null;

				player.on( 'waiting', _.bind( function () {
					if ( this.trackingInterval ) {
						this.clearTrackingInterval();
					}
				}, this ) );

				player.on( 'canplay', _.bind( function () {
					if ( player.paused() ) {
						this.clearTrackingInterval();
					} else {
						if ( !this.trackingInterval ) {
							this.startTrackingInterval();
						}
					}
				}, this ) );
				// Here we'll track the player time manually
				// so we won't depend on the player element
				// being available in reporting video progress
				// when page navigates to a different route.
				player.on( 'timeupdate', function () {
					this.model.set( 'currentTime' , player.currentTime() );
				}.bind( this ) );

				player.on( 'pause', function () {
					App.when( this.model.save() ).done( _.bind( function () {
						// Ben made me do it.
						this.model.updateCatalogVideoViewingProgress();
					}, this ) );
				}.bind( this ) );

				player.on( 'ended', function () {
					App.when( this.model.save() ).done( _.bind( function () {
						// Ben made me do it.
						this.model.updateCatalogVideoViewingProgress();
					}, this ) );
				}.bind( this ) );
			}
		}

	} );

} );
