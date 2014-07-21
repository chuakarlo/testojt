'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( '2406 - Watch Later while Browsing', function () {

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

		describe( 'Segments watch later icon', function () {

			it( 'It should click watch later then check if turned to blue', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.grayed' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > h5' ).text()
					.should.eventually.equal( '9th-12th Grade Science: RST.11-12.9, MP.2, HS-PS2-1 - Kinematic and Energy Equations' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.grayed' ).click()
					.elementByCssSelector( 'div > div.message' ).text()
					.should.eventually.equal( 'Added to Queue' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.blued' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.grayed' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > h5' ).text()
					.should.eventually.equal( 'AP Chemistry: HSS-ID.A.1, HSA-CED.A.4, HS-ESS3-5 - Real-World Application of Gas Laws' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.grayed' ).click()
					.elementByCssSelector( 'div > div.message' ).text()
					.should.eventually.equal( 'Added to Queue' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.blued' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.grayed' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > h5' ).text()
					.should.eventually.equal( '11th-12th Grade Music: SL.11-12.1, MU:Cr1-E.IIa, MU:Cn11-E.IIa - Analyzing Handel\'s Messiah' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.grayed' ).click()
					.elementByCssSelector( 'div > div.message' ).text()
					.should.eventually.equal( 'Added to Queue' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.blued' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.grayed' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details > h5' ).text()
					.should.eventually.equal( '9th-12th Grade Science: RST.11-12.3 & 8 - Evaluating Materials and Methods in a Science Experiment' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.grayed' ).click()
					.elementByCssSelector( 'div > div.message' ).text()
					.should.eventually.equal( 'Added to Queue' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.blued' )
					.nodeify( done );
			} );

			it( 'It should click watch later then check if turned to grayed', function ( done ) {

				browser
					.sleep( 4000 )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.blued' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > h5' ).text()
					.should.eventually.equal( '9th-12th Grade Science: RST.11-12.9, MP.2, HS-PS2-1 - Kinematic and Energy Equations' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.blued' ).click()
					.elementByCssSelector( 'div > div.message' ).text()
					.should.eventually.equal( 'Removed from Queue' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.grayed' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.blued' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > h5' ).text()
					.should.eventually.equal( 'AP Chemistry: HSS-ID.A.1, HSA-CED.A.4, HS-ESS3-5 - Real-World Application of Gas Laws' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.blued' ).click()
					.elementByCssSelector( 'div > div.message' ).text()
					.should.eventually.equal( 'Removed from Queue' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(2) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.grayed' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.blued' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > h5' ).text()
					.should.eventually.equal( '11th-12th Grade Music: SL.11-12.1, MU:Cr1-E.IIa, MU:Cn11-E.IIa - Analyzing Handel\'s Messiah' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.blued' ).click()
					.elementByCssSelector( 'div > div.message' ).text()
					.should.eventually.equal( 'Removed from Queue' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(3) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.grayed' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.blued' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details > h5' ).text()
					.should.eventually.equal( '9th-12th Grade Science: RST.11-12.3 & 8 - Evaluating Materials and Methods in a Science Experiment' )
					.elementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.blued' ).click()
					.elementByCssSelector( 'div > div.message' ).text()
					.should.eventually.equal( 'Removed from Queue' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(4) > div > div.sc-footer-details > span.sc-watch-later-icon.fa.fa-clock-o.blued' )
					.nodeify( done );
			} );
		} );
	} );
} );
