'use strict';

var suite  = require( 'selenium-runner' ).suite;

suite( function ( env ) {

  describe( 'Groups', function ( ) {

    it( 'should display groups', function ( done ) {

      var browser = env.browser;

      browser.maximize();

      browser

        .sleep( 2000 )

        .get( 'http://localhost:8080/' )

        .sleep( 2000 )

        // login
        .elementById( 'login-input-email' ).clear().type( 'taylor' )
        .elementById( 'login-input-password' ).clear().type( 'sinet123' )
        .elementById( 'login-button' ).click()

        .sleep( 2000 )

        // click the groups tab
        .elementByCssSelector( '#groups-tab' ).click()

        .sleep( 2000 )

        // should contain a group
        .hasElementByXPath( '//section[@id=\'groups\']//h2[.=\'Your Groups\']' ).should.eventually.equal( true )
        .hasElementByCssSelector( 'div.profile.group' ).should.eventually.equal( true )

        .nodeify( done );

    } );

  } );

} );
