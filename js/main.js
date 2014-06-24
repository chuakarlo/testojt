/*! Copyright (c) 2012-2014 School Improvement Network, LLC. All rights reserved. */

( function () {
	'use strict';

	define( function ( require ) {
		var $   = require( 'jquery' );
		var App = require( 'App' );

		$.ajaxSetup( { 'cache' : false } );

		require( 'ColdFusion' );
		require( 'jquery-cookie' );
		require( 'placeholderjs' );
		require( 'modernizr' );
		require( 'bootstrap' );
		require( 'backbone.touch' );
		require( 'modules' );
		require( 'analytics' );
		require( 'pc-progressCircle' );

		var title = document.title;
		// internet explorer bug.
		// http://stackoverflow.com/questions/4562423/ie-title-changes-to-afterhash-if-the-page-has-a-url-with-and-has-flash-s
		if ( $.browser.msie ) {
			// checks every 100ms if the title has changed.
			window.setInterval( function () {
				if ( document.title !== title ) {
					document.title = title;
				}
			}, 100 );
		}

		App.start();
	} );

} )();
