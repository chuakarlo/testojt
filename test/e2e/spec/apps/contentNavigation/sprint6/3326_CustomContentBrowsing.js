'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( '3326 - Custom Content Browsing', function () {

		var browser;

		beforeEach( function () {

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
					.url().should.become( 'http://localhost:8080/#resources/videos' )
					.nodeify( done );
			} );
		} );

		describe( 'Navigate to Custom Content Library', function () {

			it( 'It should display category list', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1)' )
					.elementByCssSelector( '#cn-libraries > div > div:nth-child(2) > ul > li:nth-child(2) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-filters > div > div > div.cn-filter-container.cn-filter-box-bottom > ul' )
					.nodeify( done );
			} );

			it( 'It should be the first category selected/highlighted', function ( done ) {

				browser
					.hasElementByCssSelector( '#cn-filters > div > div > div.cn-filter-container.cn-filter-box-bottom > ul > li.cn-custom-category.selected > div > span.cn-filter-item-title' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should display segments related to custom content', function ( done ) {

				browser
					.hasElementByCssSelector( '#cn-contents > ul' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );
		} );

		describe( 'Navigate category list', function () {

			it( 'It should display segments related to selected category', function ( done ) {

				browser
					.hasElementByCssSelector( '#cn-contents > ul' )
					.should.eventually.equal( true )
					.elementByCssSelector( '#cn-filters > div > div > div.cn-filter-container.cn-filter-box-bottom > ul > li:nth-child(3) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul' )
					.elementByCssSelector( '#cn-filters > div > div > div.cn-filter-container.cn-filter-box-bottom > ul > li:nth-child(4) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul' )
					.elementByCssSelector( '#cn-filters > div > div > div.cn-filter-container.cn-filter-box-bottom > ul > li:nth-child(5) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul' )
					.nodeify( done );
			} );
		} );
	} );
} );
