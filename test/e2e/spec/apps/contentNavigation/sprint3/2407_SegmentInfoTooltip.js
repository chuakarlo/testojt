'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( '2407 - Segment Info Tooltip', function () {

		var browser;

		beforeEach ( function () {

			browser = env.browser;
		} );

		describe( 'Login to PD360', function () {

			it( 'should log in the user', function ( done ) {

				browser
					.setWindowSize( 1440, 900 )
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
					.nodeify( done );
			} );
		} );

		describe( 'Segment Info Tooltip', function () {

			it( 'It should click the info icon and display description', function ( done ) {
				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' ).click()
					.nodeify( done );
			} );

			it( 'It should close the segment description', function ( done ) {
				browser
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > span.sc-info-icon.fa.blued.fa-times-circle' ).click()
					.nodeify( done );
			} );

			it( 'It should open multiple segment info', function ( done ) {
				browser
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' ).click()
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' ).click()
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' ).click()
					.hasElementByClassName( 'cn-overlay' )
					.nodeify( done );
			} );

			it( 'It should close multiple segment description', function ( done ) {
				browser
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > span.sc-info-icon.fa.blued.fa-times-circle' ).click()
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > span.sc-info-icon.fa.blued.fa-times-circle' ).click()
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > span.sc-info-icon.fa.blued.fa-times-circle' ).click()
					.nodeify( done );
			} );
		} );
	} );
} );
