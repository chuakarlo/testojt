define( function ( require ) {
	'use strict';

	var validateEmail = require( 'videoPlayer/utils/validateEmail' );

	describe( '`validateEmail`', function () {

		it( 'should return `true` if email is valid', function () {
			validateEmail( 'test@example.com' ).should.be.true;
		} );

		it( 'should return `false` if email is valid', function () {
			validateEmail( 'test#example.com' ).should.be.false;
		} );
	} );
} );
