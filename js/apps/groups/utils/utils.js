define( function ( require, exports, module ) {
	'use strict';
	var _ = require( 'underscore' );

	module.exports = {
		'doubleUnescape' : _.compose( _.unescape, _.unescape )
	};

} );
