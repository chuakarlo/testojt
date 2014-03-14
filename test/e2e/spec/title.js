'use strict';

var suite  = require( 'selenium-runner' ).suite;
var expect = require( 'selenium-runner' ).expect;

suite( function ( env ) {

  describe( 'Title', function() {

    it( 'should have correct title', function( done ) {
      var browser = env.browser;

      browser
        .title()
        .then( function ( title ) {
          title.should.equal( 'PD360 HTML5' );
        } )
        .nodeify( done );

    });

  });

} );
