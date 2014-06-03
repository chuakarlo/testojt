define( function ( require ) {
	'use strict';

	// converts a number between 0 - 25 to lowercase alphabet letter (a-z)
	var alphabet = function ( index ) {
		return String.fromCharCode( 97 + index );
	};

	return alphabet;

} );
