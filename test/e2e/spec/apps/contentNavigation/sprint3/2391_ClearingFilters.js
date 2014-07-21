'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( '2391 - Clearing Filters', function () {

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

		describe( 'Navigation to Videos page', function () {

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

		describe( 'Clearing Filters', function () {

			it( 'It should clear the selected filter in Grades filter section', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul' )
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(4) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(6) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(8) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(3) > button' ).click()
					.nodeify( done );
			} );

			it( 'It should clear the selected filter in Collapsed Grades filter section', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(4) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(6) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(8) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(3) > button' ).click()
					.nodeify( done );
			} );

			it( 'It should clear the selected filter in Subjects filter section', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(3) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(1) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(3) > button' ).click()
					.nodeify( done );
			} );

			it( 'It should clear the selected filter in Collapsed Subjects filter section', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(3) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(1) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(3) > button' ).click()
					.nodeify( done );
			} );

			it( 'It should clear the selected filter in Topics filter section', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(2) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(1) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-topics-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(3) > button' ).click()
					.nodeify( done );
			} );

			it( 'It should clear the selected filter in Collapsed Topics filter section', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(2) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(1) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-topics-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-topics-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(3) > button' ).click()
					.elementByCssSelector( '#cn-topics-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-topics-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-topics-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.nodeify( done );
			} );

			it( 'It should verify if Clear button in Grades section is disabled', function ( done ) {

				browser
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(3) > button' ).getAttribute( 'disabled' )
					.should.eventually.equal( 'true' )
					.nodeify( done );
			} );

			it( 'It should verify if Clear button in Grades section is enable', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(4) > div > span.cn-filter-item-title' ).click()
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(3) > button' ).isEnabled()
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should verify if Clear button in Subjects section is disable', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(3) > button' ).getAttribute ( 'disabled' )
					.should.eventually.equal( 'true' )
					.nodeify( done );
			} );

			it( 'It should verify if Clear button in Subjects section is enable', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(1) > div' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(3) > button' ).isEnabled()
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should verify if Clear button in Topics section is disable', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-topics-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(3) > button' ).getAttribute ( 'disabled' )
					.should.eventually.equal( 'true' )
					.nodeify( done );
			} );

			it( 'It should verify if Clear button in Topics section is enable', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(1) > div > span.cn-filter-item-title' ).click()
					.elementByCssSelector( '#cn-topics-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(3) > button' ).isEnabled()
					.should.eventually.equal( true )
					.nodeify( done );
			} );

		} );
	} );
} );
