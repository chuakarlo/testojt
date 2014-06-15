define( function () {
	'use strict';

	return {
		'limitCharacters' : function ( text, limit ) {
			return text ? text.length > limit ? text.substr( 0, limit ) + '...' : text : '';
		}
	};
} );
