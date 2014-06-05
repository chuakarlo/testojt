define( function ( require ) {
	'use strict';

	var $       = require( 'jquery' );
	var videojs = require( 'videojs' );

	videojs.plugin( 'ccToggle', function ( ) {
		var init;
		init = function () {
			var self  = this;
			//add toggle function for cc button
			$( 'div.vjs-captions-button.vjs-menu-button.vjs-control' ).on( 'click', function () {
				var ccBtn = document.getElementsByClassName( 'vjs-captions-button vjs-menu-button vjs-control' )[ 0 ];

				var color = ccBtn.getAttribute( 'style' );
				if ( ccBtn.getAttribute( 'aria-pressed' ) === 'true' ) {
					/* jshint camelcase: false */
					self.showTextTrack( self.textTracks_[ 0 ].id_, 'captions' );

					if ( color === 'display: none;' ) {
						setTimeout( function ( ) {
							ccBtn.setAttribute( 'style', 'color: #CAEEAC; display: block !important;' );
						}, 2500 );
					} else {
						ccBtn.setAttribute( 'style', 'color: #CAEEAC; display: block !important;' );
					}
				} else {
					if ( color !== 'display: none;' ) {
						ccBtn.setAttribute( 'style', 'color: #FFFFFF; display: block !important;' );
						self.showTextTrack( undefined, 'captions' );
					}
				}

			} );

			//catch error on text track not found and remove cc button
			self.on( 'error' , function ( e ) {
				if ( e.target === document.getElementsByClassName( 'vjs-captions vjs-text-track' )[ 0 ] && e.type === 'error') {
					$( 'div.vjs-captions-button.vjs-menu-button.vjs-control' ).remove();
				}
			} );

			//check cc..
			$( 'div.vjs-captions-button.vjs-menu-button.vjs-control' ).click();
		};

		this.on( 'loadedmetadata', init );
	} );

} );
