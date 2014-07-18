/*jshint expr: true*/
define( function ( require ) {
	'use strict';

	var startsWith = require( 'common/helpers/startsWith' );

	describe( '`startsWith` function', function () {

		describe( 'when `starts` parameter is empty', function () {

			it( 'does return `true`', function () {
				startsWith( 'Archive: Test', '' ).should.be.true;
			} );

		} );

		describe( 'when either the `str` or `starts` parameter is null', function () {

			it( 'does return `false`', function () {
				startsWith( 'Archive: Test', null ).should.be.false;
				startsWith( null, 'Archive:' ).should.be.false;
			} );

		} );

		describe( 'when the `starts` parameter is longer than the `str` parameter', function () {

			it( 'does return `true`', function () {
				startsWith( 'Archive:', 'Archive: Test' ).should.be.false;
			} );

		} );

		describe( 'when the `str` parameter starts with the `starts` parameter', function () {

			it( 'does return `true`', function () {
				startsWith( 'Archive: Test', 'Archive:' ).should.be.true;
			} );

		} );

	} );

} );
