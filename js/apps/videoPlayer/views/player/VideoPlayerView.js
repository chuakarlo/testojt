define( function ( require ) {
	'use strict';

	require( 'moment-timezone' );
	require( 'timezone' );

	var moment     = require( 'moment' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var videojs    = require( 'videojs' );
	var Marionette = require( 'marionette' );

	// Video player plugins
	require( 'videoPlayer/plugins/captionToggle' );
	require( 'videoPlayer/plugins/videoOverlay' );
	require( 'videoPlayer/plugins/videoReplay' );
	require( 'videoPlayer/plugins/staticDisplay' );
	require( 'videoPlayer/plugins/videoTracking' );

	var App    = require( 'App' );
	var config = App.request( 'videoPlayer:config' );

	var template = require( 'text!videoPlayer/templates/player/playerItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'id' : 'vjs-cont',

		'templateHelpers' : {

			'videoUrl' : function () {
				var url;

				if ( ! this.Uploaded ) {
					var bitrates  = ',304,552,800,1152,1552,1952,2448,';
					var extension = '.mp4.csmil/master.m3u8';
					var folder    = this.FileName.split( '.' )[ 0 ];
					var file      = this.FileName.split( '.' )[ 0 ] + '_';

					// set video base URL
					url = 'http://schoolimp-vh.akamaihd.net/i/PD360/media/video/';

					if ( this.ContentTypeId === 3 ) {
						url += 'PD360/';
					} else if ( this.ContentTypeId === 6 ) {
						url += 'CC360/';
					}

					url += this.SKU + '/';
					url += folder + '/';
					url += file + bitrates + extension;
				} else {
					url = config.video.previewUrl + 'video/ugc/' + this.FileName;
				}

				return url;
			},

			'getCC' : function () {
				var url    = 'PD360/media/video/';
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
			this.initNextSegment();
		},

		'initializePlayer' : function () {
			var self = this;

			var player = videojs( 'video-content', {
				'controls'  : true,
				'autoplay'  : true,
				'techOrder' : [ 'flash', 'html5' ]
			}, function () {
				$( 'div.vjs-captions-button.vjs-menu-button.vjs-control > div.vjs-menu' ).remove();
				document.getElementsByClassName( 'vjs-captions-button vjs-menu-button vjs-control' )[ 0 ].setAttribute( 'style', 'display: none;' );

				// Check if flash is supported so,
				// volume() won't throw an error if flash player isn't available.
				if ( videojs.Flash.isSupported() ) {
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

			player.on( 'firstplay', function () {
				player.removeChild( 'loadingSpinner' );
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
					'imageUrl'     : 'http://resources.pd360.com/PD360/media/thumb/' + this.model.get( 'ImageURL' ),
					'imageOpacity' : 0.5,
					'imageHeight'  : '100%',
					'imageWidth'   : '100%',
					'overlayText'  : 'In order to watch the entire video segment, you must have an active content license.<br>For assistance or to learn more, please call 855-337-7500.'
				} );
			}
		},

		'startTracking' : function ( player ) {
			player.tracker( { 'model' : this.model } );
		},

		'isMobile' : function () {
			return videojs.IS_IOS ||
				videojs.IS_ANDROID ||
				videojs.IS_OLD_ANDROID;
		},

		'initNextSegment' : function () {
			if ( this.model.next ) {
				if ( $.browser.mobile ||  $.browser.ipad ) {
					this.listenTo( this, 'render', this.displayBlock );
				} else {
					this.listenTo( this, 'afterPlayerInit', this.displayOverlay );
				}
			}

		},

		'displayBlock' : function ( player ) {
			// display Next video below player
			this.$el.find( '#next-url' ).prop( 'href', '#resources/videos/' + this.model.next.get( 'ContentId' ) );
			this.$el.find( '#fa-info' ).text( 'Play Next: ' + this.model.next.get( 'ContentName' ) );
			this.$el.find( '#next-segment' ).css( 'display', 'block' );
		},

		'displayOverlay' : function ( player ) {
			// display Next video in overlay
			player.videoOverlay( {
				'imageUrl'     : 'http://resources.pd360.com/PD360/media/thumb/' + this.model.next.get( 'ImageURL' ),
				'imageOpacity' : 0.75,
				'clickUrl'     : '#resources/videos/' + this.model.next.get( 'ContentId' ),
				'overlayText'  : '<div id="video-up-next"><p id="vjs-p-overlay">Up Next:</p><p id="vjs-title-overlay">' + this.model.next.get( 'ContentName' ) + '</p></div>'
			} );
		}

	} );

} );
