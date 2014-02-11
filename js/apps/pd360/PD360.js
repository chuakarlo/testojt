define( function ( require ) {
	'use strict';

	var $    = require( 'jquery' );
	var Vent = require( 'Vent' );

	return function ( pd360App, App ) {

		// initialize PD360 swf on creation
		var PD360 = require( './views/PD360View' );
		App.flashContent.show( new PD360() );

		var content = $( App.flashContent.el );
		var pd360;

		Vent.on( 'flash:show', function () {
			content.removeClass( 'hidden-flash' );
		} );

		Vent.on( 'flash:hide', function () {
			content.addClass( 'hidden-flash' );
		} );

		Vent.on( 'flash:navigate', function ( main, sub, options ) {
			if ( !pd360 ) {
				pd360 = $( '#PD360' )[ 0 ];
			}

			sub = sub || '';

			if ( options ) {
				pd360.navigateFromContainer( main, sub, options );
			} else {
				pd360.navigateFromContainer( main, sub );
			}

		} );

		Vent.on( 'flash:login', function ( creds ) {
			pd360.loginFromContainer( creds.ncesId, 'pd360', creds.email + '|' + creds.username, creds.md5 );
		} );

		Vent.on( 'flash:logout', function () {
			pd360.logoutFromContainer();
		} );

	};
} );
