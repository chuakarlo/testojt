define( function ( require ) {
	'use strict';

	var $ = require( 'jquery' );

	return function ( text, num ) {
		text = text || '';

		var ellipsis = '...';

		if ( String( text ).length <= num ) {
			ellipsis = '';
		}

		var abbreviation = $.trim( text ).substring( 0, num ) + ellipsis;
		return abbreviation;
	};

} );
