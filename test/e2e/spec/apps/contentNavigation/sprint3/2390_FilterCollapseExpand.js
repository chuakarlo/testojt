'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( '2390 - Filter Collapse Expand', function () {

		var browser;

		beforeEach( function () {

			browser = env.browser;
		} );

		describe( 'Login to PD360', function () {

			it( 'It should log you in and navigate to home page', function ( done ) {

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
					.hasElementByClassName( 'cn-content-name' )
					.nodeify( done );
			} );
		} );

		describe( 'Filter Collapse Expand', function () {

			it( 'It should collapse and expand the grades filter section', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.nodeify( done );

			} );

			it( 'It should collapse the grades filter section with selected filter', function ( done ) {

				browser
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(4) > div' ).click()
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(6) > div' ).click()
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(8) > div' ).click()
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.nodeify( done );

			} );

			it( 'It should collapse and expand the subjects filter section', function ( done ) {

				browser
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.nodeify( done );
			} );

			it( 'It should collapse the subjects filter section with selected filter', function ( done ) {

				browser
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(3) > div' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(1) > div' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.nodeify( done );
			} );

			it( 'It should collapse and expand the topic filter section', function ( done ) {

				browser
					.elementByCssSelector( '#cn-topics-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-topics-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.nodeify( done );
			} );

			it( 'It should collapse the topics filter section with the selected filter', function ( done ) {

				browser
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(2) > div > span.cn-filter-item-title' ).click()
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(1) > div > span.cn-filter-item-title' ).click()
					.elementByCssSelector( '#cn-topics-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.nodeify( done );
			} );
		} );
	} );
} );
