'use strict';

var suite  = require( 'selenium-runner' ).suite;

suite( function ( env ) {

  describe.skip( 'Group', function ( ) {

	it( 'should display group', function ( done ) {

		var browser = env.browser;

		browser.maximize();

		browser

		.sleep( 2000 )

		// login
		.elementById( 'login-input-email' ).clear().type( 'matthew.donaldson@schoolimprovement.com' )
		.elementById( 'login-input-password' ).clear().type( 'pd360' )
		.elementById( 'login-button' ).click()

		// wait for home page to display
		.sleep( 2000 )

		// go to group page
		.get( 'http://localhost:8080/#groups/84021' )

		.sleep( 2000 )

		// the title should contain the correct group name
		.elementByXPath( '//div[@class=\'title\']/h2' )
		.text().should.eventually.become( 'Jim Knight - Instructional Coaching June 2012' )

		// button should be a join button
		.elementById( 'membership' )
		.text().should.eventually.become( 'Join' )

		// join the group
		.elementById( 'membership' ).click()

		.sleep( 2000 )

		// joining a group should redirect back to groups list
		.url().should.become( 'http://localhost:8080/#groups' )

		// get the group again
		.get( 'http://localhost:8080/#groups/84021' )

		.sleep( 2000 )

		// button should be a leave button
		.elementById( 'membership' )
		.text().should.eventually.become( 'Leave' )

		// leave the group
		.elementById( 'membership' ).click()

		.nodeify( done );

	} );

  } );

} );
