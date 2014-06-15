define( function () {
	'use strict';

	return {
		'navigate' : function ( url ) {
			window.open( url );
			return false;
		}
	};
} );
