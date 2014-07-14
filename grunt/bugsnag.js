'use strict';

var bugsnag = require( './lib/bugsnag' );

module.exports = function ( grunt ) {

	grunt.registerTask( 'bugsnag', function () {
		bugsnag( this.async() );
	} );

};
