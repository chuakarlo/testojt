'use strict';

var suite  = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( 'Logout', function() {

		it( 'should change nav and title after logging user out', function(done) {

			var browser = env.browser;

			browser.maximize();

			browser

				// Login
				.elementById( 'login-input-email' ).clear().type( 'matthew.donaldson@schoolimprovement.com' )
				.elementById( 'login-input-password' ).clear().type( 'pd360' )
				.elementById( 'login-button' ).click()

				// Verify that the nav menu exist by looking for an item that comes with the nav menu
				.hasElementById( 'groups-tab' ).should.eventually.equal( true )

				// Open User Menu and Click Logout
				.elementByCssSelector( '.user-menu a.dropdown-toggle' ).click()
				.elementByLinkText( 'Log Out' ).click()

				.url().should.become( 'http://localhost:8080/#login' )

				// Verify the nav menu no longer exists
				.hasElementById( 'groups-tab' ).should.eventually.equal( false )

				.nodeify( done );

		} );

	} );

} );
