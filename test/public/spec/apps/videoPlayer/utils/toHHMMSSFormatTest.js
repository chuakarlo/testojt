define ( function ( require ) {
	'use strict';

	var timeFormat = require( 'videoPlayer/utils/toHHMMSSFormat' );

	describe( '.timeFormat', function () {
		it( 'will return a string', function () {
			timeFormat( 0 ).should.be.a( 'string' );
		} );

		it( 'will match the form hh:mm:ss' , function () {
			timeFormat( 175 ).should.match( /^(20|21|22|23|[01]\d|\d)((:[0-5]\d){1,2})$/ );
		} );

		it( 'will return 00:05:42 when input is 342' , function () {
			timeFormat( 342 ).should.equal( '00:05:42' );
		} );
	} );
} );
