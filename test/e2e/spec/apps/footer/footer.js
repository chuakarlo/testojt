'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function( env ) {

	describe( 'Footer', function() {

		var browser;

		beforeEach( function() {

			browser = env.browser;

		} );

		it( 'should show the default footer branding image when not logged in', function( done ) {
			browser
				.elementByCssSelector( '.footer-img-region > img')
				.getAttribute('src').should.eventually.contain('img/pd-360.png')
				.nodeify( done );
		} );

		describe( 'Logging in with no branding', function() {

			after( function( done ) {
				// Open User Menu and Click Logout
				browser
				.elementByCssSelector( '.user-menu a.dropdown-toggle' ).click()
				.sleep( 1000 )
				.elementByCssSelector( '.user-menu.open a[href="#logout"]').click()
				.sleep( 1000 )
				.nodeify( done );

			} );

			it( 'should not change the footer image', function( done ) {

				browser

					.elementById( 'login-input-email' ).clear().type( 'diao.chan' )
					.elementById( 'login-input-password' ).clear().type( 'pd360' )
					.elementById( 'login-button' ).click()

					.sleep( 2000 )

					//.elementByXPath( '//*[@id="main-content"]/div/h1' ).text().should.eventually.become( 'Home' )
					.elementIfExists('id', 'Home-page-view')
					.elementByCssSelector( '.footer-img-region > img')
					.getAttribute('src').should.eventually.contain('img/pd-360.png')
					.nodeify( done );

			} );

		} );

		describe( 'Logging in with branding', function() {

			it( 'should change the footer image', function( done ) {

				browser

					.elementById( 'login-input-email' ).clear().type( 'EsselmanM@michigan.gov' )
					.elementById( 'login-input-password' ).clear().type( 'pd360' )
					.elementById( 'login-button' ).click()

					.sleep( 2000 )

					.elementIfExists('id', 'Home-page-view')
					.elementByCssSelector( '.footer-img-region > img')
					.getAttribute('src').should.eventually.contain('EASbanner')
					.nodeify( done );

			} );

			describe( 'Logging out with branding', function() {

				it( 'should remove the branding image back to the default', function( done ) {

					browser
					.elementByCssSelector( '.user-menu a.dropdown-toggle' ).click()
					.sleep( 1000 )
					.elementByCssSelector( '.user-menu.open a[href="#logout"]').click()

					.sleep( 1000 )

					.elementByCssSelector( '.footer-img-region > img')
					.getAttribute('src').should.eventually.contain('img/pd-360.png')
					.nodeify( done );
				} );
			} );
		} );

	} );

} );