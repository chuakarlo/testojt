'use strict';

var suite  = require( 'selenium-runner' ).suite;

suite( function ( env ) {

  describe( 'Group Members', function ( ) {

    it( 'should display group members', function ( done ) {

      var browser = env.browser;

      browser.maximize();

      browser
        .get( 'http://localhost:8080/' )

        // login
        .elementById( 'login-input-email' ).clear().type( 'taylor' )
        .elementById( 'login-input-password' ).clear().type( 'sinet123' )
        .elementById( 'login-button' ).click()

        // click the groups tab
        .elementByCssSelector( '#groups-tab' ).click()

        // should contain a group
        .hasElementByXPath( '//section[@id=\'groups\']//h2[.=\'Your Groups\']' ).should.eventually.equal( true )
        .hasElementByCssSelector( 'div.profile.group' ).should.eventually.equal( true )

        // click a group
        .elementByCssSelector( 'div.profile.group' ).click()

        // should contain a wall
        .hasElementByXPath( '//div[@id=\'wall\']//h2[.=\'Wall\']' ).should.eventually.equal( true )

        // click members tab
        .elementByXPath( '//ul[@id=\'tabs\']//a[.=\'Members\']' ).click()

        // should contain members
        .hasElementByXPath( '//div[@id=\'members\']//h2[.=\'Members\']' ).should.eventually.equal( true )

        .nodeify( done );

    } );

  } );

} );
