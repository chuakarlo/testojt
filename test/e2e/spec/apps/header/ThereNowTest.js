'use strict';

var suite  = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	// can't be tested until logout is fixed
	describe.skip( 'ThereNow', function() {

		it( 'should display a ThereNow link', function(done) {

			var browser = env.browser;

			browser.maximize();

			browser
				.get( 'http://localhost:8080/#login')
				.sleep( 250 )

				.elementById( 'login-input-email' ).clear().type( 'matthew.donaldson@schoolimprovement.com' )
				.elementById( 'login-input-password' ).clear().type( 'pd360' )
				.elementById( 'login-button' ).click()
				.sleep( 500 )

				.elementByCssSelector( '#resources-tab' ).click()

				.sleep( 100 )

				.elementByCssSelector( '#link-resources-more' ).click()

				.sleep( 200 )

				// Verify the thereNow link appears
				.hasElementByXPath( '//a[@id=\'link-more-thereNow\']' ).should.eventually.equal( true )

				.elementByCssSelector( '.user-menu a.dropdown-toggle' ).click()
				.elementByLinkText( 'Log Out' ).click()



				.nodeify( done );

		} );

		it( 'should not display a ThereNow link', function(done) {

			var browser = env.browser;

			browser.maximize();

			browser
				.sleep( 2000 )
				.get( 'http://localhost:8080/#login')
				.sleep( 250 )

				// user does not have thereNow access
				.elementById( 'login-input-email' ).clear().type( 'diao.chan' )
				.elementById( 'login-input-password' ).clear().type( 'pd360' )
				.elementById( 'login-button' ).click()
				.sleep( 500 )

				.elementByCssSelector( '#resources-tab' ).click()

				.sleep( 100 )

				.elementByCssSelector( '#link-resources-more' ).click()

				.sleep( 200 )

				// Verify the nav menu no longer exists
				.hasElementByXPath( '//a[@id=\'link-more-thereNow\']' ).should.not.eventually.equal( true )

				.nodeify( done );

		} );

	} );

} );
