define( function( require ) {
	'use strict';

	var $       = require( 'jquery' );
	var videojs = require( 'videojs' );

	videojs.plugin( 'ccToggle', function ( ) {
		var init;
		init = function() {
			var player;

			player = this;
			$( 'div.vjs-captions-button.vjs-menu-button.vjs-control > div.vjs-menu' ).remove();

			$( 'div.vjs-captions-button.vjs-menu-button.vjs-control' ).on( 'click', function() {
				var ccBtn = document.getElementsByClassName( 'vjs-captions-button vjs-menu-button vjs-control' )[ 0 ];
				var color = ccBtn.getAttribute( 'style' );

				if ( color === null ) {
					ccBtn.setAttribute( 'style', 'color: #CAEEAC' );
					/* jshint camelcase: false */
					player.showTextTrack( player.textTracks_[ 0 ].id_, 'captions' );
				} else {
					ccBtn.removeAttribute( 'style' );
					player.showTextTrack( undefined, 'captions' );
				}
			} );

		};
		this.on( 'loadedmetadata', init );
	} );

} );
