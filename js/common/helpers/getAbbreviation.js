define( function ( require ) {
	'use strict';

	var $ = require( 'jquery' );

	return function ( text, num ) {
		var ellipsis = '...';

		if ( text.length <= num ) {
			ellipsis = '';
		}

		var abbreviation = $.trim( text ).substring( 0, num ) + ellipsis;
		return abbreviation;
	};

} );
