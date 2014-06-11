define( function ( require ) {
	'use strict';

	var $       = require( 'jquery' );
	var videojs = require( 'videojs' );

	videojs.plugin( 'ccToggle', function ( ) {
		// Remove closed caption menu.
		$( 'div.vjs-captions-button > div.vjs-menu' ).remove();

		var init = function () {
			var self  = this;
			var ccBtn = $( 'div.vjs-captions-button' );
			var ccOff = { 'color' : '#FFFFFF', 'display' : 'block' };
			var ccOn  = { 'color' : '#CAEEAC', 'display' : 'block' };

			//add toggle function for cc button
			ccBtn.on( 'click', function () {
				var style = ccBtn.attr( 'style' );

				if ( ccBtn.attr( 'aria-pressed' ) === 'true' ) {
					/* jshint camelcase: false */
					self.showTextTrack( self.textTracks_[ 0 ].id_, 'captions' );

					if ( style === 'display: none;' ) {
						setTimeout( function ( ) {
							ccBtn.css( ccOn );
						}, 2500 );
					} else {
						ccBtn.css( ccOn );
					}
				} else {
					if ( style !== 'display: none;' ) {
						ccBtn.css( ccOff );
						self.showTextTrack( undefined, 'captions' );
					}
				}

			} );

			// Catch error on text track not found and remove cc button.
			self.on( 'error' , function ( e ) {
				var klass = $( e.target ).attr( 'class' );
				if ( klass === 'vjs-captions vjs-text-track' && e.type === 'error') {
					ccBtn.remove();
				}
			} );

			ccBtn.click();
		};

		this.on( 'loadedmetadata', init );
	} );

} );
