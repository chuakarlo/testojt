'use strict';

var suite       = require( 'selenium-runner' ).suite;
var resolutions = require( '../../resolutions' );

suite( function ( env ) {

	describe.only( 'Group Phone View', function() {
		var browser;

		before( function ( done ) {
			browser = env.browser;

			browser

				.elementById( 'login-input-email' ).clear().type( 'testfoo' )
				.elementById( 'login-input-password' ).clear().type( 'testfoo' )
				.elementById( 'login-button' ).click()
				.nodeify( done );
		} );

		// Phone Menus
		it( 'should contain info tab in phone view', function ( done ) {

			browser

				.sleep( 1500 )

				.get( 'http://localhost:8080/#groups/4883' )

				.setWindowSize( resolutions.phone.portrait.width, resolutions.phone.portrait.height )

				.sleep( 200 )

				.elementById( 'tab-info' ).text().then( function ( html ) {
					html.should.contain( 'Info' );
				} )

				.nodeify( done );

		} );

	} );

} );
