'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	var browser;

	describe( 'View Notifications', function () {

		beforeEach( function () {
			browser = env.browser;
		} );

		it( 'should log you in', function ( done ) {

			browser
				.elementById( 'login-input-email' ).clear().type( 'testfoo' )
				.elementById( 'login-input-password' ).clear().type( 'testfoo' )
				.elementById( 'login-button' ).click()
				.nodeify( done );

		} );

		it( 'should click bell icon for notification', function ( done ) {

			browser
				.elementById( 'pd360-main-nav' )
				.elementByCssSelector( 'ul.navbar-right > li.hidden-xs > a' ).click()
				.nodeify( done );

		} );

	} );

} );
