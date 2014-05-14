'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	var browser;

	describe( 'Video Uploader', function () {


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

		it( 'should click more resources', function ( done ) {

			browser
				.elementByClassName( 'dropdown-menu' )
				.elementByCssSelector( '.resources-list > li > a[href="#resources/more"]' ).click()
				.sleep(25)
				.nodeify( done );

		} );

		it( 'should click video uploader tool', function ( done ) {

			browser
				.waitForElementById( 'PD360' )
				.elementById( 'link-more-uploader' ).click()
				.nodeify( done );

		} );

	} );

} );
