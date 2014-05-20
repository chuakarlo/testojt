'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	var browser;

	describe( 'Focus Objective', function () {


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

		it( 'should click focus objectives', function ( done ) {

			browser
				.elementByCssSelector( '.learning-targets > .row > .lt-left-nav > .nav > li.focus-objectives > a' ).click()
				.waitForElementByClassName( 'lt-content' )
				.nodeify( done );

		} );

		it( 'should show folder titles', function ( done ) {

			browser
				.elementByClassName( 'title-folder' )
				.nodeify( done );

		} );

		it( 'should redirect to a specific folder', function ( done ) {

			browser
				.elementByCssSelector( '.title-folder > h3 > a' ).click()
				.waitForElementByClassName( 'lt-content' )
				.nodeify( done );

		} );

		it( 'should display folder title', function ( done ) {

			browser
				.elementByClassName( 'fo-callout-info' )
				.nodeify( done );

		} );

		it( 'should display back button', function ( done ) {

			browser
				.elementByClassName( 'fa' )
				.nodeify( done );

		} );

		it( 'should redirect to a specific video', function ( done ) {

			browser
				.elementByCssSelector( '.fo-content-image > a' ).click()
				.waitForElementByClassName( 'video-js' )
				.nodeify( done );

		} );

	} );

} );
