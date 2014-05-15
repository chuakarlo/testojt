define( function ( require ) {
	'use strict';

	var videojs = require( 'videojs' );

	var extend = function ( obj ) {
		var arg;
		var i;
		var k;
		for ( i = 1; i < arguments.length; i++ ) {
			arg = arguments[ i ];
			for ( k in arg ) {
				if ( arg.hasOwnProperty( k ) ) {
					obj[ k ] = arg[ k ];
				}
			}
		}
		return obj;
	} ;

	var defaults = {
		imageUrl : '' ,
		clickUrl : '' ,
		opacity  : 0.8 ,
		height   : '80%' ,
		width    : '85%' ,
		text     : 'another video'
	} ;

	var nextVideoOverlay = function ( options ) {
		var self       = this;
		var settings     = extend( { }, defaults, options || { } );
		var showingImage = false;

		var overlay = {

			showImage : function ( ) {

				if ( showingImage ) {
					return;
				}
				showingImage = true;

				var holderDiv = document.createElement( 'div' );
				holderDiv.id           = 'vjs-image-overlay-holder';
				holderDiv.style.height = settings.height;
				holderDiv.style.width  = settings.width;

				var overlayImage = document.createElement( 'img' );
				overlayImage.src           = settings.imageUrl;
				overlayImage.style.opacity = settings.opacity;

				overlayImage.onclick = function ( ) {
					window.open( settings.clickUrl, '_self' );
				};

				holderDiv.appendChild( overlayImage );

				var overlaySpanHolder = document.createElement( 'div' );
				overlaySpanHolder.className = 'play-button-circle';

				var overlaySpan = document.createElement( 'span' );
				overlaySpan.id        = 'vjs-icon-play';
				overlaySpan.className = 'fa fa-play';

				overlaySpan.onclick = function ( ) {
					window.open( settings.clickUrl, '_self' );
				};
				overlaySpanHolder.appendChild( overlaySpan );

				var overlayP = document.createElement( 'p' );
				overlayP.id = 'vjs-p-overlay';
				var overlayText = document.createTextNode( 'Up Next: ' );
				overlayP.appendChild( overlayText );

				var overlayTitle = document.createElement( 'p' );
				overlayTitle.id = 'vjs-title-overlay';

				overlayText = document.createTextNode( settings.text );
				overlayTitle.appendChild( overlayText );

				holderDiv.appendChild( overlayP );
				holderDiv.appendChild( overlayTitle );
				holderDiv.appendChild( overlaySpanHolder );

				self.el().appendChild( holderDiv );
				self.pause();
			}
		};

		self.on( 'ended', overlay.showImage );
	};

	videojs.plugin( 'nextVideoOverlay', nextVideoOverlay );

} );
