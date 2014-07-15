define( function ( require ) {
	'use strict';

	var _   = require( 'underscore' );
	var vjs = require( 'videojs' );

	var defaults = {
		'timeToShow'   : null,
		'imageUrl'     : '',
		'imageOpacity' : 1,
		'imageHeight'  : '100%',
		'imageWidth'   : '100%',
		'overlayText'  : '<p>Video Overlay</p>'
	};

	var staticDisplay = function ( options ) {
		var self     = this;
		var settings = _.extend( defaults, options || { } );
		var shown    = false;

		var display = {

			'checkTime' : function () {
				if ( self.currentTime() > settings.timeToShow ) {
					display.showStaticImage();
				}
			},

			'showStaticImage' : function () {
				if ( shown ) {
					return;
				}
				shown = true;

				var holderDiv = document.createElement( 'div' );
				holderDiv.id = 'vjs-static-image-display';

				if ( settings.imageUrl ) {
					var overlayImage = document.createElement( 'img' );
					overlayImage.src           = settings.imageUrl;
					overlayImage.style.opacity = settings.imageOpacity;
					overlayImage.style.width   = settings.imageWidth;
					overlayImage.style.height  = settings.imageHeight;

					holderDiv.appendChild( overlayImage );
				}

				var overlayTextCont = document.createElement( 'div' );
				overlayTextCont.id = 'vjs-static-text-overlay';
				overlayTextCont.innerHTML = settings.overlayText;

				holderDiv.appendChild( overlayTextCont );
				var parentNode = self.el().parentNode;

				self.off( 'timeupdate' );
				self.stopTrackingProgress();

				setTimeout( function () {
					self.dispose();
					parentNode.appendChild( holderDiv );
				}, 100 );

			}

		};

		if ( settings.timeToShow ) {
			self.on( 'timeupdate', display.checkTime );
		}
	};

	vjs.plugin( 'staticDisplay', staticDisplay );
} );
