'use strict';

var lint = require( './lib/lint' );
require( 'colors' );

module.exports = function ( grunt ) {

	grunt.registerTask( 'lint', function () {
		console.log( 'Running linting tools...'.bold );
		lint.jshint( this.async() );
	} );

	grunt.registerTask( 'travis-lint', function () {
		lint.travisLint( this.async() );
	} );

};