'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( '3311 - User Uploaded Video Browsing', function () {

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

		describe( 'Navigate to User Uploaded Video', function () {

			it( 'It should navigate to user uploaded videos', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1)' )
					.elementByCssSelector( '#cn-libraries > div > div.cn-filter-box-bottom > ul > li:nth-child(3) > div > span.cn-filter-item-title' ).click()
					.hasElementByCssSelector( '#cn-filters > div > div > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li.selected > h4' )
					.nodeify( done );
			} );
		} );

		describe( 'Default selected category', function () {

			it( 'It should be Popular as default category', function ( done ) {

				browser
					.hasElementByCssSelector( '#cn-filters > div > div > div.cn-filter-container > ul > li:nth-child(2).selected' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should load 24 segments', function ( done ) {

				browser
					.waitForElementByCssSelector ( '#cn-contents > ul > li:nth-child(1)' )
					.safeExecute( '$( "ul.segment-card-list li" ).length' )
					.should.eventually.equal( 24 )
					.nodeify( done );
			} );
		} );
	} );
} );
