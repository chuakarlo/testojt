/*! Copyright (c) 2012-2014 School Improvement Network, LLC. All rights reserved. */

( function () {
	'use strict';

	define( function ( require ) {
		var App = require( 'App' );

		require( 'ColdFusion' );
		require( 'jquery-cookie' );
		require( 'jquery-placeholder' );
		require( 'modernizr' );
		require( 'bootstrap' );
		require( 'backbone.touch' );
		require( 'rotate' );
		require( 'modules' );
		require( 'analytics' );
		require( 'pc-progressCircle' );

		App.start();
	} );

} )();
