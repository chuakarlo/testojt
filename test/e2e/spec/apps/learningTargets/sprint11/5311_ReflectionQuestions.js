'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	var browser;

	describe( '5311 - Add Reflection Questions to Learning Targets', function () {

		beforeEach( function () {

			browser = env.browser;

		} );

		it( 'It should log you in', function ( done ) {

			browser
				.elementById( 'login-input-email' ).clear().type( 'matthew.donaldson@schoolimprovement.com' )
				.elementById( 'login-input-password' ).clear().type( 'pd360' )
				.elementById( 'login-button' ).click()
				.nodeify( done );
		} );

		it( 'It should click to resources tab', function ( done ) {

			browser
				.elementById( 'resources-tab' ).click()
				.nodeify( done );

		} );

		it( 'It should check list of resources', function ( done ) {

			browser
				.elementByClassName( 'dropdown-menu' )
				.elementByCssSelector( '.resources-list > li > a[href="#resources/videos"]' ).text().then( function ( text ) {
					text.should.equal( 'Videos' );
				} )
				.elementByCssSelector( '.resources-list > li > a[href="#resources/learning/processes"]' ).text().then( function ( text ) {
					text.should.equal( 'Learning Targets' );
				} )
				.elementByCssSelector( '.resources-list > li > a[href="#resources/observation/me"]' ).text().then( function ( text ) {
					text.should.equal( 'Observation 360' );
				} )
				.elementByCssSelector( '.resources-list > li > a[href="#resources/communities"]' ).text().then( function ( text ) {
					text.should.equal( 'Communities' );
				} )
				.elementByCssSelector( '.resources-list > li > a[href="#resources/lumibook"]' ).text().then( function ( text ) {
					text.should.equal( 'LumiBook' );
				} )
				.elementByCssSelector( '.resources-list > li > a[href="#resources/more"]' ).text().then( function ( text ) {
					text.should.equal( 'More Resources' );
				} )
				.nodeify( done );

		} );

		it( 'It should click and navigate to Learning Targets Page', function ( done ) {

			browser
				.elementByClassName( 'dropdown-menu' )
				.elementByCssSelector( '.resources-list > li > a[href="#resources/learning/processes"]' ).click()
				.nodeify( done );

		} );

		it( 'It should click and navigate to reflection questions', function ( done ) {

			browser
				.elementByCssSelector( '.learning-targets > .row > .lt-left-nav > .nav > li.reflection-questions > a' ).click()
				.waitForElementByClassName( 'lt-content' )
				.nodeify( done );

		} );

		it( 'It should show reflection questions title', function ( done ) {

			browser
				.elementByClassName( 'reflection-questions-title' )
				.nodeify( done );

		} );

		it( 'It should redirect to a specific video', function ( done ) {

			browser
				.elementByCssSelector( '.reflection-questions-title' ).click()
				.waitForElementByClassName( 'video-js' )
				.nodeify( done );

		} );

	} );

} );
