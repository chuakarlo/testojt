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

				// Verify that the groups tab is in nav
				.hasElementById( 'groups-tab' ).should.eventually.equal( true )

				// Open User Menu and Click Logout
				.elementByCssSelector( '.user-menu a.dropdown-toggle' ).click()
				.elementByLinkText( 'Log Out' ).click()

				.sleep( 300 )

				.url().should.eventually.equal( 'http://localhost:8080/#login' )

				// Verify that the groups tab is not in nav
				.hasElementById( 'groups-tab' ).should.eventually.equal( false )

				.nodeify( done );

		} );

	} );

} );
