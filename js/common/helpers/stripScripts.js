define( function ( require ) {
	'use strict';

	return function ( text ) {

		// remove anything between and including script tags
		return text.replace( /<script[^>]*>([\S\s]*?)<\/script\s*>/gi, '' );

	};

} );
