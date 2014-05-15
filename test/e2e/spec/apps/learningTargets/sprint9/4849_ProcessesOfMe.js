'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	var browser;

	describe( 'Processess of Me', function () {


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

		it( 'should click resources tab', function ( done ) {

			browser
				.elementById( 'resources-tab' ).click()
				.nodeify( done );

		} );

		it( 'should click learning targets', function ( done ) {

			browser
				.elementByClassName( 'dropdown-menu' )
				.elementByCssSelector( '.resources-list > li > a[href="#resources/learning"]' ).click()
				.nodeify( done );

		} );

		it( 'should click processess of me', function ( done ) {

			browser
				.elementByCssSelector( '.learning-targets > .row > .lt-left-nav > .nav > li.processes > a' ).click()
				.waitForElementByClassName( 'lt-content' )
				.nodeify( done );

		} );

		it( 'should show the process steps', function ( done ) {

			browser
				.elementByCssSelector( '.lt-toggle-btn' ).click()
				.nodeify( done );

		} );

		it( 'should redirect process steps to flex', function ( done ) {

			browser
				.elementById( 'resources-tab' ).click()
				.waitForElement( 'id', 'PD360' )
				.nodeify( done );

		} );

	} );

} );
