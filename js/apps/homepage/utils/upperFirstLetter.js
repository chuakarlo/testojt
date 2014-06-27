define( function () {
	'use strict';

	return function ( text ) {
		return text.toLowerCase().replace( /\b[a-z]/g, function ( letter ) {
			return letter.toUpperCase();
		} );
	};
} );
