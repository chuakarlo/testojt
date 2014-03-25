'use strict';

var suite = require( 'selenium-runner' ).suite;

suite( function ( env ) {

  describe( 'Resource Menu', function() {

    it( 'should contain expected Resource Apps', function ( done ) {
      var browser = env.browser;

      browser.maximize();

      browser
        .elementById( 'login-input-email' ).clear().type( 'diao.chan' )
        .elementById( 'login-input-password' ).clear().type( 'pd360' )
        .elementById( 'login-button' ).click()

        .elementById( 'resources-tab' ).moveTo( 0, 0 )

        // animation dropdown is set to 500 ms
        .sleep( 500 )

        .elementByTagName( 'html' ).text().then( function ( html ) {
          html.should.contain( '{Videos}' );
          html.should.contain( 'Observation' );
          html.should.contain( 'Communities' );
          html.should.contain( '{Tasks}' );
        } )

        .nodeify( done );

    });
  });

} );
