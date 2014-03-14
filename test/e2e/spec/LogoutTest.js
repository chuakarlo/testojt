'use strict';

var suite  = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe.skip( 'Logout', function() {

		it( 'should change nav and title after logging user out', function(done) {

			var browser = env.browser;

			browser.maximize();

			browser
				.get( 'http://localhost:8080/#login' )

				.elementById( 'login-input-email' ).clear().type( 'matthew.donaldson@schoolimprovement.com' )
				.elementById( 'login-input-password' ).clear().type( 'pd360' )
				.elementById( 'login-button' ).click()

				.hasElementByXPath( '//div[@id=\'main-content\']//h1[.=\'Home\']' ).should.eventually.equal( true )
				.hasElementByXPath( '//li[@id=\'resources-tab\']//span[.=\'Resources\']' ).should.eventually.equal( true )
				.hasElementByXPath( '//li[@id=\'groups-tab\']//span[.=\'{Groups}\']' ).should.eventually.equal( true )

				.elementByCssSelector( 'div.nav-menu' ).moveTo( 0, 0 )

				.elementByXPath('//a[@id=\'logout\']//li[.=\'Log Out\']' ).click()

				.hasElementByXPath('//div[@class=\'sub-page-header\']//h1[.=\'Login\']' ).should.eventually.equal( true )
				.hasElementByXPath('//li[@id=\'resources-tab\']//span[.=\'Resources\']' ).should.eventually.equal( false )
				.hasElementByXPath('//li[@id=\'groups-tab\']//span[.=\'{Groups}\']' ).should.eventually.equal( false )

				.nodeify( done );

		} );
	} );

} );

