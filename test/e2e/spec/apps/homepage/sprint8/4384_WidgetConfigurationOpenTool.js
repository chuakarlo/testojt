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

	describe( 'Widget Config UI', function () {

		it( 'should have a empty widgets', function ( done ) {
			browser

				.elementIfExists( 'id', 'empty-widgets', function ( err, element ) {
					browser.takeScreenshot().saveScreenshot( '../sc/' );
				} )
				.nodeify( done );
		} );

		it( 'should have a widget configuration button', function ( done ) {
			browser

				.elementIfExists( 'id', 'widget-settings', function ( err, element ) {
					browser.takeScreenshot().saveScreenshot( '../sc/' );
				} )
				.hasElementByClassName( 'closed' )
				.nodeify( done );

		} );

		it( 'should display widget config overlay', function ( done ) {
			browser

				.elementById( 'widget-settings' ).click()
				.hasElementByClassName( 'opened' )
				.textPresent( 'Widgets' )
				.nodeify( done );
		} );

		it( 'should display default widgets', function ( done ) {
			browser

				.elementById( 'widget-settings-selection' )
				.hasElementByTagName( 'li' )
				.hasElementByClassName( 'active' )
				.nodeify( done );
		} );

		it( 'should display 3 tabs: `All Widgets`, `Active` and `Inactive`', function ( done ) {
			browser

				.elementByCssSelector( '#widget-settings-header ul #all' ).text().then( function ( text ) {
					text.should.equal( 'All Widgets' );
				} )
				.elementByCssSelector( '#widget-settings-header ul #active' ).text().then( function ( text ) {
					text.should.equal( 'Active' );
				} )
				.elementByCssSelector( '#widget-settings-header ul #inactive' ).text().then( function ( text ) {
					text.should.equal( 'Inactive' );
				} )
				.nodeify( done );
		} );

		it( 'should display active widgets when `Active` tab is clicked', function ( done ) {
			browser

				.elementByCssSelector( '#widget-settings-header #active' ).click()
				.nodeify( done );
		} );

		it( 'should display inactive widgets when `Inactive` tab is clicked', function ( done ) {
			browser

				.elementById( 'widget-settings-header' )
				.elementByTagName( 'ul' )
				.elementById( 'inactive' ).click()
				.elementById( 'widget-settings-selection' )
				.elementByTagName( 'li' )
				.elementByClassName( 'inactive' )
				.nodeify( done );
		} );

		it( 'should display all widgets (Inactive and Active) when `All Widgets` tab is clicked', function ( done ) {
			browser

				.elementById( 'widget-settings-header' )
				.elementByTagName( 'ul' )
				.elementById( 'all' ).click()
				.elementIfExists( 'id', 'widget-settings-content', function ( err, element ) {
					browser.takeScreenshot().saveScreenshot( '../sc/' );
				} )
				.elementIfExists( 'id', 'widget-settings-selection', function ( err, element ) {
					browser.takeScreenshot().saveScreenshot( '../sc/' );
				} )
				.elementByTagName( 'li' )
				.nodeify( done );
		} );
	} );
} );