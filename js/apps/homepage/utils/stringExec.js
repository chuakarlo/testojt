define( function () {
	'use strict';

	var $ = require( 'jquery' );

	return {
		'stringExec' : function ( stringFunc, options ) {
			return $.isFunction( stringFunc ) ? stringFunc( options ) : stringFunc;
		}
	};
} );
