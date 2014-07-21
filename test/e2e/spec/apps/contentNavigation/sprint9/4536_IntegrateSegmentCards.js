'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( '4536 - Integrate Segment Cards', function () {

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

		describe( 'Videos page segments details', function () {

			it( 'It should have segments thumbnail', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > img' )
					.should.eventually.equal( true )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-segment-image-container' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-segment-image-container > a > img' )
					.should.eventually.equal( true )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-segment-image-container' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-segment-image-container > a > img' )
					.should.eventually.equal( true )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-segment-image-container' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-segment-image-container > a > img' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have segments title', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > h5' )
					.should.eventually.equal( true )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > h5' ).text()
					.should.eventually.equal( '9th-12th Grade Science: RST.11-12.9, MP.2, HS-PS2-1 - Kinematic and Energy Equations' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > h5' )
					.should.eventually.equal( true )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > h5' ).text()
					.should.eventually.equal( 'AP Chemistry: HSS-ID.A.1, HSA-CED.A.4, HS-ESS3-5 - Real-World Application of Gas Laws' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > h5' )
					.should.eventually.equal( true )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > h5' ).text()
					.should.eventually.equal( '11th-12th Grade Music: SL.11-12.1, MU:Cr1-E.IIa, MU:Cn11-E.IIa - Analyzing Handel\'s Messiah' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details > h5' )
					.should.eventually.equal( true )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details > h5' ).text()
					.should.eventually.equal( '9th-12th Grade Science: RST.11-12.3 & 8 - Evaluating Materials and Methods in a Science Experiment' )
					.nodeify( done );
			} );

			it( 'It should have segments length ', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > p' )
					.should.eventually.equal( true )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > p' )
					.should.eventually.equal( true )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > p' )
					.should.eventually.equal( true )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details > p' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have info button', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' )
					.should.eventually.equal( true )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' )
					.should.eventually.equal( true )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' )
					.should.eventually.equal( true )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details > span.sc-info-icon.grayed.fa.fa-info-circle' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have clock icon', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > span.sc-watch-later-icon.grayed.fa.fa-clock-o' )
					.should.eventually.equal( true )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > span.sc-watch-later-icon.grayed.fa.fa-clock-o' )
					.should.eventually.equal( true )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > span.sc-watch-later-icon.grayed.fa.fa-clock-o' )
					.should.eventually.equal( true )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details' )
					.hasElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details > span.sc-watch-later-icon.grayed.fa.fa-clock-o' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );
		} );
	} );
} );
