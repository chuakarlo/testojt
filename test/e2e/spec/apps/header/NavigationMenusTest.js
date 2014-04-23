'use strict';

var suite       = require( 'selenium-runner' ).suite;
var resolutions = require( '../../resolutions' );

suite( function ( env ) {

	describe( 'Navigation Menus', function() {
		var browser;

		before( function ( done ) {
			browser = env.browser;

			browser

				.sleep( 200 )

				.elementById( 'login-input-email' ).clear().type( 'diao.chan' )
				.elementById( 'login-input-password' ).clear().type( 'pd360' )
				.elementById( 'login-button' ).click()
				.nodeify( done );
		} );

		// Phone Menus
		it( 'should contain expected Menu Items `phone view`', function ( done ) {
			console.log( '\tPhone Views' );

			browser

				.sleep( 200 )

				.setWindowSize( resolutions.phone.portrait.width, resolutions.phone.portrait.height )
				.elementByCssSelector( 'button.navbar-toggle' ).click()
				.sleep( 200 )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'Resources' );
					html.should.contain( 'Groups' );
					html.should.contain( 'Help' );
					html.should.contain( 'User' );
				} )

				.nodeify( done );

		} );

		it( 'should contain expected Resource Apps `phone view`', function ( done ) {

			browser

				.sleep( 200 )

				.elementByCssSelector( '#resources-tab' ).click()

				.sleep( 200 )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'Videos' );
					html.should.contain( 'Learning Targets' );
					html.should.contain( 'Observation 360' );
					html.should.contain( 'Communities' );
					html.should.contain( 'LumiBook' );
					html.should.contain( 'More Resources' );
				} )

				.nodeify( done );

		} );

		it( 'should contain expected User Menu Items `phone view`', function ( done ) {

			browser

				.sleep( 200 )

				.elementByCssSelector( '#user-tab' ).click()

				.sleep( 200 )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'User Settings' );
					html.should.contain( '{Notifications}' );
					html.should.contain( '{Help}' );
					html.should.contain( 'Log Out' );
				} )

				.nodeify( done );

		} );

		// Tablet Menus
		it( 'should contain expected Navbar Items `tablet view`', function ( done ) {
			console.log( '\tTablet Views' );

			browser

				.sleep( 200 )

				.setWindowSize( resolutions.tablet.portrait.width, resolutions.tablet.portrait.height )

				.sleep( 200 )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'Resources' );
					html.should.contain( 'Groups' );
					html.should.contain( 'Help' );
					html.should.contain( 'User' );
				} )

				.nodeify( done );

		} );

		it( 'should contain expected Menu Items `tablet view`', function ( done ) {

			browser

				.sleep( 200 )

				.elementByCssSelector( '#resources-tab' ).click()

				.sleep( 200 )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'Videos' );
					html.should.contain( 'Learning Targets' );
					html.should.contain( 'Observation 360' );
					html.should.contain( 'Communities' );
					html.should.contain( 'LumiBook' );
					html.should.contain( 'More Resources' );
				} )

				.nodeify( done );

		} );

		it( 'should contain expected User Menu Items `tablet view`', function ( done ) {

			browser

				.sleep( 200 )

				.setWindowSize( resolutions.desktop.landscape.width, resolutions.desktop.landscape.height )
				.elementByCssSelector( '#user-tab' ).click()

				.sleep( 200 )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'User Settings' );
					html.should.contain( '{Help}' );
					html.should.contain( 'Log Out' );
				} )

				.nodeify( done );

		} );

		// Desktop Views
		it( 'should contain expected Menu Items `desktop view`', function ( done ) {
			console.log( '\tDesktop Views' );

			browser

				.sleep( 200 )

				.setWindowSize( resolutions.desktop.landscape.width, resolutions.desktop.landscape.height )

				.sleep( 200 )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'Resources' );
					html.should.contain( 'Groups' );
					html.should.contain( 'Help' );
					html.should.contain( 'User' );
				} )

				.nodeify( done );

		} );

		it( 'should contain expected Resource Apps `desktop view`', function ( done ) {

			browser

				.sleep( 200 )

				.elementByCssSelector( '#resources-tab' ).click()

				.sleep( 200 )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'Videos' );
					html.should.contain( 'Learning Targets' );
					html.should.contain( 'Observation 360' );
					html.should.contain( 'Communities' );
					html.should.contain( 'LumiBook' );
					html.should.contain( 'More Resources' );
				} )

				.nodeify( done );

		} );

		it( 'should contain expected User Menu Items `desktop view`', function ( done ) {

			browser

				.sleep( 200 )

				.setWindowSize( resolutions.desktop.landscape.width, resolutions.desktop.landscape.height )

				.sleep( 200 )

				.elementByCssSelector( '#user-tab' ).click()

				.sleep( 200 )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'User Settings' );
					html.should.contain( '{Help}' );
					html.should.contain( 'Log Out' );
				} )

				.nodeify( done );

		} );

	} );

} );
