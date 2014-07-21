'use strict';
var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( '3719 - Update video segment card', function () {

		var browser;

		beforeEach ( function () {

			browser = env.browser;
		} );

		describe( 'Login', function () {

			it( 'It should log in the user', function ( done ) {

				browser
					.setWindowSize( 1440, 900 )
					.waitForElementByCssSelector( '#main-content > div > div > div.col-sm-6.first-column > div' )
					.elementById( 'login-input-email' ).clear().type( 'tyler.hansen' )
					.elementById( 'login-input-password' ).clear().type( 'tylergo' )
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
					.nodeify( done );
			} );

		} );

		describe( 'Update video segment card', function () {

			it( 'It should have an info button', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' )
					.should.eventually.equal( true )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' )
					.should.eventually.equal( true )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should click an info button', function ( done ) {

				browser
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' ).click()
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' ).click()
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' ).click()
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' ).click()
					.nodeify ( done );
			} );

			it( 'It should have segment title in overlay view', function ( done ) {

				browser
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-overlay-details > p.sc-overlay-segment-name' )
					.should.eventually.equal( true )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-overlay-details > p.sc-overlay-segment-name' )
					.should.eventually.equal( true )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-overlay-details > p.sc-overlay-segment-name' )
					.should.eventually.equal( true )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-overlay-details > p.sc-overlay-segment-name' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have segment length in overlay view', function ( done ) {

				browser
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-overlay-details > p.sc-overlay-duration' )
					.should.eventually.equal( true )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-overlay-details > p.sc-overlay-duration' )
					.should.eventually.equal( true )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-overlay-details > p.sc-overlay-duration' )
					.should.eventually.equal( true )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-overlay-details > p.sc-overlay-duration' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have segment description in overlay view', function ( done ) {

				browser
					.waitForElementByCssSelector( 'div > div.sc-overlay-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-overlay-details > p.sc-overlay-content-description' )
					.should.eventually.equal( true )
					.waitForElementByCssSelector( 'div > div.sc-overlay-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-overlay-details > p.sc-overlay-content-description' )
					.should.eventually.equal( true )
					.waitForElementByCssSelector( 'div > div.sc-overlay-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-overlay-details > p.sc-overlay-content-description' )
					.should.eventually.equal( true )
					.waitForElementByCssSelector( 'div > div.sc-overlay-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-overlay-details > p.sc-overlay-content-description' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

		} );
	} );
} );
