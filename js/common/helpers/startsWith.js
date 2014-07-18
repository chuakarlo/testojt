define( function ( require ) {
	'use strict';

	// taken from https://github.com/epeli/underscore.string
	return function startsWith ( str, starts ) {
		if ( starts === '' ) {
			return true;
		}

		if ( str === null || starts === null ) {
			return false;
		}

		str    = String( str );
		starts = String( starts );

		return str.length >= starts.length && str.slice( 0, starts.length ) === starts;
	};

} );
