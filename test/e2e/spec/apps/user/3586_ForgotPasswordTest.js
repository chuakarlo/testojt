'use strict';

var suite       = require( 'selenium-runner' ).suite;
var resolutions = require( '../../resolutions' );

suite( function ( env ) {

	describe( 'ForgotPassword from login', function () {

		var browser;

		beforeEach( function ( done ) {
			browser = env.browser;

			browser
				.elementByTagName( 'body' ).click()
				.nodeify( done );
		} );

		it( 'should show forgot password link on login page', function ( done ) {
			browser
				.get( 'http://localhost:8080/dev.html#login' )
				.waitForElementByClassName( 'js-forgot-password' )
				.sleep( 250 )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'Forgot password?' );
				} )

				.nodeify( done );

		} );

		it( 'should redirect to forgot password page on link click', function ( done ) {
			browser
				.elementByClassName( 'js-forgot-password' ).click()
				.url().should.become( 'http://localhost:8080/dev.html#forgotPassword' )
				.sleep( 1000 )

				.nodeify( done );
		} );

	} );

	describe( 'Reset Password', function () {

		var browser;

		beforeEach( function ( done ) {
			browser = env.browser;

			browser
				.get( 'http://localhost:8080/dev.html#forgotPassword' )
				.elementByTagName( 'body' ).click()
				.nodeify( done );
		} );

		it( 'should contain form elements in `phone view`', function ( done ) {
			browser

				.setWindowSize( resolutions.phone.portrait.width, resolutions.phone.portrait.height )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'Forgot your password?' );
					html.should.contain( 'Enter the email address associated with your account.' );
					html.should.contain( 'If you have any questions, please contact us at 855-337-7500 or support@schoolimprovement.com.' );
				} )

				.nodeify( done );
		} );

		it( 'should contain form elements in `tablet view`', function ( done ) {

			browser
				.setWindowSize( resolutions.tablet.portrait.width, resolutions.tablet.portrait.height )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'Forgot your password?' );
					html.should.contain( 'Enter the email address associated with your account.' );
					html.should.contain( 'If you have any questions, please contact us at 855-337-7500 or support@schoolimprovement.com.' );
				} )

				.nodeify( done );
		} );

		it( 'should contain form elements in `desktop view`', function ( done ) {

			browser
				.setWindowSize( resolutions.desktop.landscape.width, resolutions.desktop.landscape.height )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'Forgot your password?' );
					html.should.contain( 'Enter the email address associated with your account.' );
					html.should.contain( 'If you have any questions, please contact us at 855-337-7500 or support@schoolimprovement.com.' );
				} )

				.nodeify( done );
		} );

		it( 'should contain form elements errors on submit', function ( done ) {

			browser
				.setWindowSize( resolutions.desktop.landscape.width, resolutions.desktop.landscape.height )

				.elementByClassName( 'reset-button' ).click()

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'Forgot your password?' );
					html.should.contain( 'Enter the email address associated with your account.' );
					html.should.contain( 'If you have any questions, please contact us at 855-337-7500 or support@schoolimprovement.com.' );
				} )

				.nodeify( done );
		} );

	} );

} );
