define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	return function ( key ) {

		return App.request( 'session:config', key );

	};

} );
