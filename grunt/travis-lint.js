'use strict';

var lint = require( './lib/travis-lint' );

module.exports = function ( grunt ) {

	grunt.registerTask( 'travis-lint', function () {
		lint( this.async() );
	} );

};