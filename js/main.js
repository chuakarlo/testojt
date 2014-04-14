( function () {
	'use strict';

	define( function ( require ) {
		var App = require( 'App' );

		require( 'ColdFusion' );
		require( 'jquery-cookie' );
		require( 'jquery-placeholder' );
		require( 'modernizr' );
		require( 'bootstrap' );
		require( 'rotate' );
		require( 'modules' );

		App.start();
	} );

} )();
