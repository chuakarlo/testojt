'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	var browser;

	describe( 'Portfolio', function () {


		beforeEach( function () {

			browser = env.browser;

		} );

		it( 'should log you in', function ( done ) {

			browser
				.elementById( 'login-input-email' ).clear().type( 'diao.chan' )
				.elementById( 'login-input-password' ).clear().type( 'pd360' )
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
				.elementByCssSelector( '.resources-list > li > a[href="#resources/learning/processes"]' ).click()
				.nodeify( done );

		} );

		it( 'should click portfolio', function ( done ) {

			browser
				.elementByCssSelector( '.learning-targets > .row > .lt-left-nav > .nav > li.portfolio > a' ).click()
				.waitForElementByClassName( 'lt-content' )
				.nodeify( done );

		} );

		it( 'should show the portfolio items', function ( done ) {

			browser
				.elementByClassName( 'lt-content' )
				.nodeify( done );

		} );

		it( 'should redirect to flex page', function ( done ) {

			browser
				.elementByCssSelector( '.lt-link' ).click()
				.waitForElement( 'id', 'PD360' )
				.nodeify( done );

		} );

	} );

} );
