'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( '3519 - Group Resources Tab', function () {

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

		describe( 'Navigation to Group page', function () {

			it( 'It should navigate you to Group page', function ( done ) {

				browser
					.waitForElement( 'id', 'groups-tab' )
					.hasElementByClassName( 'slide-wrapper' )
					.elementById( 'groups-tab' ).click()
					.url().should.become( 'http://localhost:8080/#groups' )
					.hasElementByClassName( 'group-avatar' )
					.nodeify( done );
			} );
		} );

		describe( 'Navigate group profile page', function () {

			it( 'It should navigate you to group profile page', function ( done ) {

				browser
					.waitForElementByCssSelector( '#groupSection > ul > li:nth-child(1) > div > a.js-group-accept.btn.btn-primary' )
					.elementByCssSelector( '#groupSection > ul > li:nth-child(1) > div > a.js-group-accept.btn.btn-primary' ).click()
					.nodeify( done );
			} );
		} );

		describe( 'Navigate group resources page', function () {

			it( 'It should allow you to navigate to group resources page', function ( done ) {

				browser
					.waitForElementByCssSelector( '#group-sub-nav > div > ul' )
					.elementByCssSelector( '#tab-resources' ).click()
					.nodeify( done );
			} );

			it( 'It should have a resource attachment icon', function ( done ) {

				browser
					.waitForElementByCssSelector( '#group > div.row > div.comments > div > div.groups-content-region > div > div.resources-leader-list.resources-list' )
					.hasElementByCssSelector( '#group > div.row > div.comments > div > div.groups-content-region > div > div.resources-leader-list.resources-list > ul > li > div > div.col-xs-2.col-sm-1.col-md-1 > span > i' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have a resource name', function ( done ) {

				browser
					.hasElementByCssSelector( '#group > div.row > div.comments > div > div.groups-content-region > div > div.resources-member-list.resources-list > ul > li > div > div.resource-main.col-xs-10.col-sm-11.col-md-11 > p:nth-child(2)' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have a resource description', function ( done ) {

				browser
					.hasElementByCssSelector( '#group > div.row > div.comments > div > div.groups-content-region > div > div.resources-member-list.resources-list > ul > li > div > div.resource-main.col-xs-10.col-sm-11.col-md-11 > p.resource-description' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have a resource download button', function ( done ) {

				browser
					.hasElementByCssSelector( '#group > div.row > div.comments > div > div.groups-content-region > div > div.resources-member-list.resources-list > ul > li > div > div.resource-main.col-xs-10.col-sm-11.col-md-11 > p.resource-creator > span > button' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have a resource creator', function ( done ) {

				browser
					.hasElementByCssSelector( '#group > div.row > div.comments > div > div.groups-content-region > div > div.resources-member-list.resources-list > ul > li > div > div.resource-main.col-xs-10.col-sm-11.col-md-11 > p.resource-creator' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );
		} );
	} );
} );
