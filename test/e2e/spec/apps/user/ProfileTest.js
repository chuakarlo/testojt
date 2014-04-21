'use strict';

var suite  = require( 'selenium-runner' ).suite;

suite( function ( env ) {

	describe( 'Settings', function () {

		var browser;

		// login before each test
		beforeEach( function ( done ) {
			browser = env.browser;

			browser

				.elementById( 'login-input-email' ).clear().type( 'diao.chan' )
				.elementById( 'login-input-password' ).clear().type( 'pd360' )
				.elementById( 'login-button' ).click()
				.elementById( 'Home-page-view' )

				.nodeify( done );

		} );

		it( 'should redirect to `#settings/profile` from `#settings`', function ( done ) {

			browser

				.get( 'http://localhost:8080/#settings' )
				.sleep( 1000 )

				.url().should.become( 'http://localhost:8080/#settings/profile' )

				.nodeify( done );

		} );

		describe.skip( 'Profile Section', function () {

			// create new browser, necessary due to nesting
			before( function ( done ) {
				env.refresh( done );
			} );

			it( 'should update user information and persist after page refresh', function ( done ) {

				browser

					.sleep( 2000 )

					// navigate to settings
					.elementByCssSelector( '#pd360-main-nav li.dropdown.user-menu > a > div.menu-container.hidden-xs' ).click()
					.elementByCssSelector( 'li.dropdown.user-menu > ul > li:nth-child(1) > a' ).click()

					.sleep( 2000 )

					// verify nav items
					.elementByCssSelector( '#profile > div > div.nav' )
					.text()
					.then( function ( navText ) {
						navText.should.contain( 'Personal Info' );
						navText.should.contain( 'Licenses' );
						navText.should.contain( 'Reports' );
					} )

					// verify misc text under user's name
					.elementByCssSelector( '#profile > div > div.text > p' )
					.text().should.become( 'Edit your personal information' )

					// update firstname and lastname
					.elementById( 'firstname' ).clear().type( 'Diaoo' )
					.elementById( 'lastname' ).clear().type( 'Chann' )

					.elementById( 'save' )
					.click()

					.sleep( 2000 )

					// verify user's displayed name
					.elementByCssSelector( '#profile > div > div.text > h2' )
					.text().should.eventually.become( 'Diaoo Chann\'s Profile' )

					// refresh
					.refresh()

					.sleep( 2000 )

					// verify displayed name
					.elementByCssSelector( '#profile > div > div.text > h2' )
					.text().should.eventually.become( 'Diaoo Chann\'s Profile' )

					// verify input values
					.elementById( 'firstname' )
					.getValue().should.eventually.equal( 'Diaoo' )

					.elementById( 'lastname' )
					.getValue().should.eventually.equal( 'Chann' )

					// cleanup, reset user information
					.elementById( 'firstname' )
					.clear()
					.type( 'Diao' )
					.elementById( 'lastname' )
					.clear()
					.type( 'Chan' )
					.elementById( 'save' )
					.click()
					.nodeify( done );
			} );

		} );

	} );

} );
