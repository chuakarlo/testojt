'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	var browser;

	describe( 'Courses', function () {


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
				.elementByCssSelector( '.resources-list > li > a[href="#resources/learning"]' ).click()
				.nodeify( done );

		} );

		it( 'should click courses', function ( done ) {

			browser
				.elementByCssSelector( '.learning-targets > .row > .lt-left-nav > .nav > li.courses > a' ).click()
				.waitForElementByClassName( 'lt-content' )
				.nodeify( done );

		} );

		it( 'should show course title', function ( done ) {

			browser
				.elementByClassName( 'course-title' )
				.nodeify( done );

		} );

		it( 'should show course progress', function ( done ) {

			browser
				.elementByClassName( 'progress' )
				.nodeify( done );

		} );

		it( 'should redirect to flex page', function ( done ) {

			browser
				.elementByCssSelector( '.lt-toggle-btn' ).click()
				.waitForElement( 'id', 'PD360' )
				.nodeify( done );

		} );

	} );

} );
