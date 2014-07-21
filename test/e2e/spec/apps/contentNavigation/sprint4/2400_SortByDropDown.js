'use strict';

var suite = require( 'selenium-runner' ).suite;

suite(  function  ( env ) {

	describe( '2400 - Sort By Drop-Down', function () {

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

			it( 'should navigate you to videos page', function ( done ) {

				browser
					.waitForElement( 'id', 'resources-tab' )
					.elementByCssSelector( 'a#resources-tab' ).click()
					.hasElementByClassName( 'fa-fw.sinet-videos' )
					.elementByCssSelector( 'i.fa-fw.sinet-videos' ).click()
					.nodeify( done );
			} );
		} );

		describe( 'Sort By Drop-Down', function () {

			it( 'It should select the sort order multiple times', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-sortby > div > div:nth-child(2) > ul.cn-content-filter > li:nth-child(2) > div.cn-sort-item' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-sortby > div > div:nth-child(2) > ul.cn-content-filter > li:nth-child(1) > div.cn-sort-item' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-sortby > div > div:nth-child(2) > ul.cn-content-filter > li:nth-child(2) > div.cn-sort-item' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-sortby > div > div:nth-child(2) > ul.cn-content-filter > li:nth-child(1) > div.cn-sort-item' ).click()
					.nodeify( done );
			} );

			it( 'It should sort the filtered Grades in A-Z sort order', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-sortby > div > div:nth-child(2) > ul.cn-content-filter > li:nth-child(2) > div.cn-sort-item' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(4) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(2) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(8) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-grades-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.nodeify( done );

			} );

			it( 'It should sort the filtered Subjects in A-Z sort order', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(2) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(1) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-subjects-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.nodeify( done );
			} );

			it( 'It should sort the filtered Topics in A-Z sort order', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(2) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(1) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-topics-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.nodeify( done );

			} );

			it( 'It should sort the filtered Grades in Release Date sort order', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( 'div#cn-sortby > div > div:nth-child(2) > ul.cn-content-filter > li:nth-child(1) > div.cn-sort-item' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(4) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(2) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(8) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-grades-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.nodeify( done );
			} );

			it( 'It should sort the filtered Subjects in Release Date sort order', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(2) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(1) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-subjects-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.nodeify( done );
			} );

			it( 'It should sort the filtered Topics in Release Date sort order', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(2) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(1) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-topics-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.nodeify( done );
			} );

			it( 'It should sort the filtered Grades and Subjects in A-Z sort order', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( 'div#cn-sortby > div > div:nth-child(2) > ul.cn-content-filter > li:nth-child(2) > div.cn-sort-item' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(4) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(2) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(2) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(1) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-subjects-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-grades-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.nodeify( done );
			} );

			it( 'It should sort the filtered Grades and Topics in A-Z sort order', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(1) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(3) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(2) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(1) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-topics-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-grades-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.nodeify( done );
			} );

			it( 'It should sort the filtered Subjects and Topics in A-Z sort order', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(2) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(1) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(2) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(1) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-topics-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-subjects-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.nodeify( done );
			} );

			it( 'It should sort the filtered Grades and Subjects in Release Date sort order', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( 'div#cn-sortby > div > div:nth-child(2) > ul.cn-content-filter > li:nth-child(1) > div.cn-sort-item' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(4) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(2) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(2) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(1) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-subjects-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-grades-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.nodeify( done );
			} );

			it( 'It should sort the filtered Grades and Topics in Release Date sort order', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(2) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-filter-container-grades.cn-filter-box-bottom > ul > li:nth-child(1) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-grades-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(2) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(1) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-topics-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-grades-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.nodeify( done );
			} );

			it( 'It should sort the filtered Subjects and Topics in Release Date sort order', function ( done ) {

				browser
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(2) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-filter-container-subjects.cn-filter-box-bottom > ul > li:nth-child(1) > div' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-subjects-filter > div.cn-header.cn-header-filter.cn-filter-box-top > ul > li:nth-child(1) > button > span' ).click()
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(2) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( '#cn-topics-filter > div.cn-filter-container-topics.cn-filter-box-bottom > ul > li:nth-child(1) > div > span.cn-filter-item-title' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-topics-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.waitForElementByCssSelector( '#cn-contents > ul > li:nth-child(1) > div > div.sc-segment-image-container > a > span' )
					.elementByCssSelector( 'div#cn-subjects-filter > div > ul > li > button.btn.btn-default.cn-clear-btn' ).click()
					.nodeify( done );
			} );
		} );
	} );
} );
