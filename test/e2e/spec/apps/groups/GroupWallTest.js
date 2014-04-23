'use strict';

var suite  = require( 'selenium-runner' ).suite;

suite( function ( env ) {

  describe( 'Group Wall', function ( ) {

    it( 'should display a group wall', function ( done ) {

      var browser = env.browser;

      browser.maximize();

      browser

        .sleep( 2000 )

        .get( 'http://localhost:8080/' )

        .sleep( 2000 )

        // login
        .elementById( 'login-input-email' ).clear().type( 'david.rojas@schoolimprovement.com' )
        .elementById( 'login-input-password' ).clear().type( 'pd360' )
        .elementById( 'login-button' ).click()

        .sleep( 2000 )

        // click the groups tab
        .elementByCssSelector( '#groups-tab' ).click()

        .sleep( 2000 )

        // should contain a group
        .hasElementByXPath( '//section[@id=\'groups\']//h2[.=\'Your Groups\']' ).should.eventually.equal( true )
        .hasElementByCssSelector( 'div.profile.group' ).should.eventually.equal( true )

        // click a group
        .elementByCssSelector( 'div.profile.group' ).click()

        .sleep( 5000 )

        // should contain a wall
        .hasElementByXPath( '//div[@id=\'wall\']//h2[.=\'Wall\']' ).should.eventually.equal( true )

        .nodeify( done );

    } );

  } );

} );
