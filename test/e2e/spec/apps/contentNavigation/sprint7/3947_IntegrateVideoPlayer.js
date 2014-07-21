'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( '3947 - Integrate Video Player', function () {

		var browser;

		beforeEach( function () {

			browser = env.browser;
		} );

		describe( 'Login', function () {

			it( 'It should log in the user', function ( done ) {

				browser
					.setWindowSize( 1440, 900 )
					.waitForElementByCssSelector( '#main-content > div > div > div.col-sm-6.first-column > div' )
					.elementById( 'login-input-email' ).clear().type( 'lulz1' )
					.elementById( 'login-input-password' ).clear().type( 'pd360' )
					.elementById( 'login-button' ).click()
					.waitForElement( 'id', 'Home-page-view' )
					.nodeify( done );
			} );
		} );

		describe( 'Navigate to Videos page', function () {

			it( 'It should navigate you to videos page', function ( done ) {

				browser
					.waitForElement( 'id', 'resources-tab' )
					.elementByCssSelector( 'a#resources-tab' ).click()
					.hasElementByClassName( 'fa-fw.sinet-videos' )
					.elementByCssSelector( 'i.fa-fw.sinet-videos' ).click()
					.url().should.become( 'http://localhost:8080/#resources/videos' )
					.nodeify( done );
			} );
		} );

		describe( 'Navigate to video players page', function () {

			it( 'It should navigate you to video players page', function ( done ) {

				browser
					.waitForElementByCssSelector ( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container' )
					.elementByCssSelector ( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > img' ).click()
					.waitForElementByCssSelector ( '#video-player' )
					.nodeify ( done );
			} );
		} );

		describe( 'Navigate back to Videos page', function () {

			it( 'It should navigate you to videos page', function ( done ) {

				browser
					.elementByCssSelector( 'a#resources-tab' ).click ()
					.elementByCssSelector( '#pd360-main-nav > div.navbar-left.bootstro > ul > li.dropdown.yamm-fw.open > ul > li > div > ul > li:nth-child(1) > a > div.icon > i' ).click()
					.url().should.become( 'http://localhost:8080/#resources/videos' )
					.nodeify( done );
			} );

		} );

		describe( 'Navigate to video players page through information icon', function () {

			it( 'It should navigate you to video players page', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' ).click()
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-overlay-details > a' ).click()
					.waitForElementByCssSelector( '#video-player' )
					.nodeify( done );
			} );
		} );
	} );
} );
