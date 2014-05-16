define( function ( require ) {
	'use strict';

	var $       = require( 'jquery' );
	var videojs = require( 'videojs' );

	videojs.plugin( 'ccToggle', function ( ) {
		var init;
		init = function () {
			var self = this;

			// remove menu
			$( 'div.vjs-captions-button.vjs-menu-button.vjs-control > div.vjs-menu' ).remove();

			//add toggle function for cc button
			$( 'div.vjs-captions-button.vjs-menu-button.vjs-control' ).on( 'click', function () {
				var ccBtn = document.getElementsByClassName( 'vjs-captions-button vjs-menu-button vjs-control' )[ 0 ];
				var color = ccBtn.getAttribute( 'style' );

				if ( color === null ) {
					ccBtn.setAttribute( 'style', 'color: #CAEEAC' );
					/* jshint camelcase: false */
					self.showTextTrack( self.textTracks_[ 0 ].id_, 'captions' );
				} else {
					ccBtn.removeAttribute( 'style' );
					self.showTextTrack( undefined, 'captions' );
				}
			} );

			//catch error on text track not found and remove cc button
			self.on( 'error' , function ( e ) {
				if ( e.target === document.getElementsByClassName( 'vjs-captions vjs-text-track' )[ 0 ] && e.type === 'error') {
					$( 'div.vjs-captions-button.vjs-menu-button.vjs-control' ).remove();
				}
			} );

			//show track if available
			$( 'div.vjs-captions-button.vjs-menu-button.vjs-control' ).click();
		};
		this.on( 'loadedmetadata', init );
	} );

} );
