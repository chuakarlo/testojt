'use strict';

var suite  = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( 'Help Link', function() {

		it( 'should contain a help link with credentials', function(done) {

			var browser = env.browser;

			browser.maximize();

			browser

				// Login
				.elementById( 'login-input-email' ).clear().type( 'matthew.donaldson@schoolimprovement.com' )
				.elementById( 'login-input-password' ).clear().type( 'pd360' )
				.elementById( 'login-button' ).click()

				// the title should contain the correct group name
				.elementByXPath( '//a[@id=\'help\']' ).click()

				.nodeify( done );

		} );

	} );

} );
