define( function ( require ) {
	'use strict';

	var $ = require( 'jquery' );

	return function () {

		if ( $.browser.iphone || $.browser.ipad ) {
			window.scrollTo( 0, 0 );
		}

	};

} );
