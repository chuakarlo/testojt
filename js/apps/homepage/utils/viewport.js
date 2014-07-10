define( function () {
	'use strict';

	var $ = require( 'jquery' );
	return {
		'getActiveView' : function () {
			var viewPort = [ 'lg', 'md', 'sm', 'xs' ];
			var result;
			for ( var i = 0; i < viewPort.length; i++ ) {
				if ( $( '.visible-' + viewPort[ i ] ).is( ':visible' ) ) {
					result = viewPort[ i ];
					break;
				}
			}
			return result;
		}
	};

} );
