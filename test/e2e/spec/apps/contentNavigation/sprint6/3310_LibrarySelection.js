'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( '3310 - Library Selection', function () {

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

		describe( 'Content libraries', function () {

			it( 'It should have a content library "PD 360"', function ( done ) {

				browser
					.waitForElementByCssSelector ( '#cn-libraries > div > div.cn-filter-box-bottom > ul' )
					.elementByCssSelector( '#cn-libraries > div > div.cn-filter-box-bottom > ul > li.selected > div > span.cn-filter-item-title' ).textPresent( 'PD 360' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have a content library "Custom Content library"', function ( done ) {

				browser
					.elementByCssSelector( '#cn-libraries > div > div.cn-filter-box-bottom > ul > li:nth-child(2) > div > span.cn-filter-item-title' ).textPresent( 'All you need is gypsylove' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have a content library "User Uploaded Videos"', function ( done ) {

				browser
					.elementByCssSelector( '#cn-libraries > div > div.cn-filter-box-bottom > ul > li:nth-child(3) > div > span.cn-filter-item-title' ).textPresent( 'User Uploaded Videos' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have a check symbol beside the selected library', function ( done ) {

				browser
					.elementByCssSelector( '#cn-libraries > div > div.cn-filter-box-bottom > ul > li.selected > div > span.cn-filter-tick.fa.fa-check' )
					.nodeify( done );
			} );

			it( 'It should be the "PD 360" selected as default', function ( done ) {

				browser
					.elementByCssSelector( '#cn-libraries > div > div.cn-filter-box-bottom > ul > li:nth-child(1).selected' )
					.nodeify( done );
			} );
		} );
	} );
} );
