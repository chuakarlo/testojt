'use strict';

var suite  = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( 'Logout', function() {

		it( 'should change nav and title after logging user out', function(done) {

			var browser = env.browser;

			browser.maximize();

			browser
				.get( 'http://localhost:8080/#login' )

				// Login
				.elementById( 'login-input-email' ).clear().type( 'matthew.donaldson@schoolimprovement.com' )
				.elementById( 'login-input-password' ).clear().type( 'pd360' )
				.elementById( 'login-button' ).click()

				// Verify that the nav menu exist by looking for an item that comes with the nav menu
				.hasElementById( 'groups-tab' ).should.eventually.equal( true )

				// Open User Menu and Click Logout
				.elementByCssSelector( '.user-menu a.dropdown-toggle' ).click()
				.sleep( 250 )
				.elementByCssSelector( '.user-menu.open a[href="#logout"]').click()
				.sleep( 250 )

				// Verify the nav menu no longer exists
				.setImplicitWaitTimeout( 0 )
				.hasElementById( 'groups-tab' ).should.eventually.equal( false )
				.setImplicitWaitTimeout( 5000 )

				.nodeify( done );

		} );
	} );

} );
