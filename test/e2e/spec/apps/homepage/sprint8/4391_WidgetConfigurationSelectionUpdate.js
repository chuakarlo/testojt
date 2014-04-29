'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	var browser;

	describe( 'Login', function () {


		beforeEach( function () {

			browser = env.browser;

		} );

		it( 'should log you in', function ( done ) {

			browser
				.elementById( 'login-input-email' ).clear().type( 'testfoo' )
				.elementById( 'login-input-password' ).clear().type( 'testfoo' )
				.elementById( 'login-button' ).click()
				.waitForElement( 'id', 'Home-page-view' )
				.nodeify( done );
		} );

	} );

	describe( 'Widget Configuration Selection and Update', function () {

		it( 'should select `All Widgets` tab by default', function ( done ) {
			browser

				.elementById( 'widget-settings' ).click()
				.elementByCssSelector( '#widget-settings-header .selected' ).text().then( function ( text ) {
					text.should.equal( 'All Widgets' );
				} )
				.nodeify( done );
		} );

	} );
} );