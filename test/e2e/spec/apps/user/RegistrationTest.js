'use strict';

var suite       = require( 'selenium-runner' ).suite;
var resolutions = require( '../../resolutions' );


suite( function ( env ) {

	describe( 'Registration from login', function() {

		var browser;

		beforeEach( function ( done ) {
			browser = env.browser;

			browser
				.elementByTagName( 'body' ).click()
				.nodeify( done );
		} );


		it( 'should show register button on login page', function ( done ) {
			browser
				.get( 'http://localhost:8080/#login')
				.sleep( 250 )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'Register' );
					html.should.contain( 'Free registration includes' );
					html.should.contain( '30-day access' );
					html.should.contain( 'Register for PD 360' );
				} )

				.nodeify( done );

		} );

		it( 'should redirect to register page on button click', function ( done ) {
			browser

				.elementById( 'register-button' ).click()
				.url().should.become( 'http://localhost:8080/#register' )
				.sleep(1000)

				.nodeify( done );
		} );


	} );

	describe( 'Registration', function() {

		var browser;

		beforeEach( function ( done ) {
			browser = env.browser;

			browser
				.get( 'http://localhost:8080/#register' )
				.elementByTagName( 'body' ).click()
				.nodeify( done );
		} );

		it( 'should contain form elements in `phone view`', function ( done ) {
			browser

				.setWindowSize( resolutions.phone.portrait.width, resolutions.phone.portrait.height )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'First Name' );
					html.should.contain( 'Last Name' );
					html.should.contain( 'Email' );
					html.should.contain( 'Password' );
					html.should.contain( 'Re-type Password' );
					html.should.contain( 'Title / Position' );
					html.should.contain( 'Phone Number' );
					html.should.contain( 'Country' );
					html.should.contain( 'State / Province' );
					html.should.contain( 'District Name' );
					html.should.contain( 'School Name' );
				} )

				.nodeify( done );
		} );

		it( 'should contain form elements in `tablet view`', function ( done ) {

			browser
				.setWindowSize( resolutions.tablet.portrait.width, resolutions.tablet.portrait.height )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'First Name' );
					html.should.contain( 'Last Name' );
					html.should.contain( 'Email' );
					html.should.contain( 'Password' );
					html.should.contain( 'Re-type Password' );
					html.should.contain( 'Title / Position' );
					html.should.contain( 'Phone Number' );
					html.should.contain( 'Country' );
					html.should.contain( 'State / Province' );
					html.should.contain( 'District Name' );
					html.should.contain( 'School Name' );
				} )

				.nodeify( done );
		} );

		it( 'should contain form elements in `desktop view`', function ( done ) {

			browser
				.setWindowSize( resolutions.desktop.landscape.width, resolutions.desktop.landscape.height )

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'First Name' );
					html.should.contain( 'Last Name' );
					html.should.contain( 'Email' );
					html.should.contain( 'Password' );
					html.should.contain( 'Re-type Password' );
					html.should.contain( 'Title / Position' );
					html.should.contain( 'Phone Number' );
					html.should.contain( 'Country' );
					html.should.contain( 'State / Province' );
					html.should.contain( 'District Name' );
					html.should.contain( 'School Name' );
				} )

				.nodeify( done );
		} );


		it( 'should contain form elements errors on submit', function ( done ) {

			browser
				.setWindowSize( resolutions.desktop.landscape.width, resolutions.desktop.landscape.height )

				.elementById( 'register-button' ).click()

				.elementByTagName( 'html' ).text().then( function ( html ) {
					html.should.contain( 'First name is required' );
					html.should.contain( 'Last name is required' );
					html.should.contain( 'Email address is required' );
					html.should.contain( 'Password is required' );
					html.should.contain( 'Re-typing password is required' );
					html.should.contain( 'Country is required' );
					html.should.contain( 'State is required' );
					html.should.contain( 'District name is required' );
				} )

				.nodeify( done );
		} );

	} );

} );
