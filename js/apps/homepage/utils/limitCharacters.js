define( function () {
	'use strict';

	return function ( text, limit ) {
		return text ? text.length > limit ? text.substr( 0, limit ) + '...' : text : '';
	};
} );