define( function ( require ) {
	'use strict';

	var utils = require( 'videoPlayer/utils/utils' );

	describe( 'Video Player Utils', function () {

		describe( 'formatTime', function () {

			var formattedTime;

			before( function () {
				formattedTime = utils.formatTime( 342 );
			} );

			after( function () {
				formattedTime = false;
			} );

			it( 'should return a string', function () {
				formattedTime.should.be.a( 'string' );
			} );

			it( 'should match the format `hh:mm:ss`', function () {
				formattedTime.should.match( /^(20|21|22|23|[01]\d|\d)((:[0-5]\d){1,2})$/ );
			} );

			it( 'should return 00:05:42 when input is 342', function () {
				formattedTime.should.equal( '00:05:42' );
			} );

		} );

	} );
} );
