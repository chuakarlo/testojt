define( function ( require ) {
	'use strict';

	var _   = require( 'underscore' );
	var vjs = require( 'videojs' );

	var defaults = {
		'timeToShow'    : null,
		'imageUrl'      : '',
		'clickUrl'      : '',
		'imageOpacity'  : 1,
		'positionTop'   : '5%',
		'positionLeft'  : '7%',
		'overlayHeight' : '85%',
		'overlayWidth'  : '85%',
		'overlayText'   : '<p>Video Overlay</p>'
	};

	var videoOverlay = function ( options ) {
		var self         = this;
		var settings     = _.extend( defaults, options || { } );
		var showingOverlay = false;

		var overlay = {

			'checkOverlay' : function () {
				var duration = settings.timeToShow || self.duration();
				if ( self.currentTime() < duration - 1 ) {
					overlay.hideOverlay();
				}
			},

			'showAfterDuration' : function () {
				if ( settings.timeToShow && ( self.currentTime() > settings.timeToShow ) ) {
					overlay.showOverlay();
				}
			},

			'showOverlay' : function () {
				if ( showingOverlay ) {
					return;
				}

				showingOverlay = true;

				var holderDiv = document.createElement( 'div' );
				holderDiv.id           = 'vjs-image-overlay-holder';
				holderDiv.style.top    = settings.positionTop;
				holderDiv.style.left   = settings.positionLeft;
				holderDiv.style.height = settings.overlayHeight;
				holderDiv.style.width  = settings.overlayWidth;

				if ( settings.imageUrl ) {
					var overlayImage = document.createElement( 'img' );
					overlayImage.src           = settings.imageUrl;
					overlayImage.style.opacity = settings.imageOpacity;

					holderDiv.appendChild( overlayImage );

					if ( settings.clickUrl ) {
						overlayImage.onclick = function ( ) {
							window.open( settings.clickUrl, '_self' );
						};

						var overlaySpanHolder = document.createElement( 'div' );
						overlaySpanHolder.className = 'play-button-circle';

						var overlaySpan = document.createElement( 'span' );
						overlaySpan.id        = 'vjs-icon-play';
						overlaySpan.className = 'fa fa-play';

						overlaySpan.onclick = function ( ) {
							window.open( settings.clickUrl, '_self' );
						};

						overlaySpanHolder.appendChild( overlaySpan );

						holderDiv.appendChild( overlaySpanHolder );
					}

				}

				var overlayTextCont = document.createElement( 'div' );
				overlayTextCont.id = 'vjs-text-overlay';
				overlayTextCont.innerHTML = settings.overlayText;

				holderDiv.appendChild( overlayTextCont );

				self.el().appendChild( holderDiv );
				self.pause();
			},

			'hideOverlay' : function () {
				if ( !showingOverlay ) {
					return;
				}
				showingOverlay = false;
				self.el().removeChild( document.getElementById( 'vjs-image-overlay-holder' ) );
			}

		};

		self.on( 'ended', overlay.showOverlay );
		self.on( 'timeupdate', overlay.showAfterDuration );
		self.on( 'timeupdate', overlay.checkOverlay );
	};

	vjs.plugin( 'videoOverlay', videoOverlay );

} );
