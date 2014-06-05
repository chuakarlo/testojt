define( function () {
	'use strict';

	return function ( url ) {
		window.open( url );
		return false;
	};
} );
