'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function( env ) {

	describe( 'Login', function() {

		var browser;

		beforeEach( function() {

			browser = env.browser;

		} );

		it( 'should log you in', function( done ) {

			browser
				.elementById( 'login-input-email' ).clear().type( 'diao.chan' )
				.elementById( 'login-input-password' ).clear().type( 'pd360' )
				.elementById( 'login-button' ).click()
				.elementByXPath( '//*[@id="main-content"]/div/h1' ).text().should.eventually.become( 'Home' )

				.nodeify( done );
		} );

	} );

	describe( 'Login "Remember me"', function() {

		before( function ( done ) {
			env.refresh( done );
		} );
		
		var browser;
		var clength;

		beforeEach( function() {

			browser = env.browser;

		} );

		it( 'should set the "remember" cookie when you click on the checkbox', function( done ) {
			browser
				.get( 'http://localhost:8080/#login' )
				.elementByCssSelector( 'input[type="checkbox"]' ).click()
				.sleep(500)

				.allCookies().then( function( cookies ) {
					clength = cookies.length;
					cookies.forEach( function(cookie) {
						if( cookie.name === 'remember') {
							cookie.value.should.equal('true');
						}
					} );
				} )
				.nodeify( done );
		} );

		it( 'should remove the "remember" cookie when you unclick the checkbox', function( done ) {
			browser
				.elementByCssSelector( 'input[type="checkbox"]' ).click()
				.sleep(500)
				.allCookies().then( function ( cookies ) {
					( cookies.length < clength ).should.equal(true);
				} )
				.nodeify( done );
		} );

		it( 'should contain the username once you log back out with remember me checked', function( done ) {

			browser

				// Login
				.elementById( 'login-input-email' ).clear().type( 'diao.chan' )
				.elementById( 'login-input-password' ).clear().type( 'pd360' )
				.elementByCssSelector( 'input[type="checkbox"]' ).click()
				.elementById( 'login-button' ).click()
				.sleep(1000)

				// Open User Menu and Click Logout
				.elementByCssSelector( '.user-menu a.dropdown-toggle' ).click()
				.sleep( 250 )
				.elementByCssSelector( '.user-menu.open a[href="#logout"]').click()
				.sleep( 250 )

				// Check username input once we've been logged out
				.elementById( 'login-input-email' ).getValue().should.eventually.become( 'diao.chan' )
				.nodeify( done );

		} );
	} );
} );