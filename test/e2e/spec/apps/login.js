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

				.sleep( 2000 )

				.elementById( 'login-input-email' ).clear().type( 'diao.chan' )
				.elementById( 'login-input-password' ).clear().type( 'pd360' )
				.elementById( 'login-button' ).click()

				.sleep( 2000 )

				//.elementByXPath( '//*[@id="main-content"]/div/h1' ).text().should.eventually.become( 'Home' )
				.elementIfExists('id', 'Home-page-view')

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

				.sleep( 2000 )

				.get( 'http://localhost:8080/#login' )

				.sleep( 2000 )

				.elementByCssSelector( 'input[type="checkbox"]' ).click()

				.sleep( 2000 )

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

				.sleep( 2000 )

				.elementByCssSelector( 'input[type="checkbox"]' ).click()

				.sleep( 2000 )

				.allCookies().then( function ( cookies ) {
					( cookies.length < clength ).should.equal(true);
				} )
				.nodeify( done );
		} );

		it( 'should contain the username once you log back out with remember me checked', function( done ) {

			browser

				.sleep( 2000 )

				// Login
				.elementById( 'login-input-email' ).clear().type( 'diao.chan' )
				.elementById( 'login-input-password' ).clear().type( 'pd360' )
				.elementByCssSelector( 'input[type="checkbox"]' ).click()

				.sleep( 2000 )

				.elementById( 'login-button' ).click()

				.sleep(2000)

				// Open User Menu and Click Logout
				.elementByCssSelector( '.user-menu a.dropdown-toggle' ).click()
				.sleep( 2000 )
				.elementByCssSelector( '.user-menu.open a[href="#logout"]').click()
				.sleep( 10000 )

				// Check username input once we've been logged out
				.elementById( 'login-input-email' ).getValue().should.eventually.become( 'diao.chan' )
				.nodeify( done );

		} );
	} );
} );