define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'Common', function () {

		require( 'common/controllers/index' );
		require( 'common/views/index' );

	} );

} );
