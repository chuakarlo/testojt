'use strict';

var lint = require( './lib/lint' );

require( 'colors' );

module.exports = function ( grunt ) {

	grunt.registerTask( 'travis-lint', function () {
		lint.travisLint( this.async() );
	} );

	grunt.registerTask( 'lint', [ 'jshint', 'eslint' ] );

	// Do not use directly, use the `lint` task instead
	grunt.registerTask( 'jshint', function () {
		console.log(); console.log( 'JSHint:'.bold );

		lint.jshint( this.async() );
	} );

	// Do not use directly, use the `lint` task instead
	grunt.registerTask( 'eslint', function () {
		console.log(); console.log( 'ESLint:'.bold );

		lint.eslint( this.async() );
	} );

};