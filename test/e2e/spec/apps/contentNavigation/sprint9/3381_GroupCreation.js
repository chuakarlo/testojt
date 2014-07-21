'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( '3381 - Group Creation', function () {

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

			it( 'It should have a "Use groups to collaborate with others. View your groups below or create your own" string available ', function ( done ) {

				browser
					.elementById( 'groupSection' ).textPresent ( 'Use groups to collaborate with others. View your groups below or create your own.' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );
		} );

		describe( 'Navigate to Create Group', function () {

			it( 'It should navigate to create group page', function ( done ) {

				browser
					.elementByCssSelector( '#groupSection > span > a[href="#groups/create"]' ).click()
					.url().should.become( 'http://localhost:8080/dev.html#groups/create' )
					.nodeify( done );
			} );
		} );

		describe( 'Fields and Controls in Create Group', function () {

			it( 'It should have a group name field', function ( done ) {

				browser
					.waitForElementByCssSelector( '#main-content > div > div.form-container.group-creation' )
					.hasElementById( 'inputGroupName' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have a group description field', function ( done ) {

				browser
					.hasElementById( 'inputGroupDescription' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have a group logo field', function ( done ) {

				browser
					.hasElementByCssSelector( '#main-content > div > div.form-container.group-creation > form > div:nth-child(3) > div > div' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have a group banner field', function ( done ) {

				browser
					.hasElementByCssSelector( '#main-content > div > div.form-container.group-creation > form > div:nth-child(4) > div > div' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should have a privacy option', function ( done ) {

				browser
					.hasElementByCssSelector( '#main-content > div > div.form-container.group-creation > form > div:nth-child(5) > div' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should Public as default in privacy', function ( done ) {

				browser
					.elementById( 'setGroupPublic' ).isSelected ()
					.should.eventually.equal( true )
					.nodeify( done );
			} );

			it( 'It should be a radio button for public', function ( done ) {

				browser
					.safeExecute( 'document.getElementById ( "setGroupPublic" ).type' )
					.should.eventually.equal( 'radio' )
					.nodeify( done );
			} );

			it( 'It should be a radio button for private', function ( done ) {

				browser
					.safeExecute( 'document.getElementById ( "setGroupPrivate" ).type' )
					.should.eventually.equal( 'radio' )
					.nodeify( done );
			} );

			it( 'It should be a checkbox button for hidden', function ( done ) {

				browser
					.safeExecute( 'document.getElementById ( "setGroupVisibility" ).type' )
					.should.eventually.equal( 'checkbox' )
					.nodeify( done );
			} );

			it( 'It should have a cancel and create button', function ( done ) {

				browser
					.hasElementByCssSelector( '#main-content > div > div.form-container.group-creation > form > div:nth-child(6) > div > button' )
					.should.eventually.equal( true )
					.nodeify( done );
			} );
		} );

		describe( 'Create a group ', function () {

			it( 'It should create a group without a group logo and banner photo and redirect to the created group page', function ( done ) {

				browser
					.elementById( 'inputGroupName' ).clear ().type( 'selenium test' )
					.elementById( 'inputGroupDescription' ).clear ().type( 'selenium test' )
					.elementByCssSelector( '#main-content > div > div.form-container.group-creation > form > div:nth-child(6) > div > button.btn.create.btn-primary.submit-btn.ladda-button' ).click()
					.waitForElement( 'id', 'group' )
					.nodeify( done );
			} );
		} );
	} );
} );
