'use strict';

var lint = require( './lib/lint' );

require( 'colors' );

module.exports = function ( grunt ) {

	grunt.registerTask( 'lint', function ( type ) {
		if ( type === 'file' || type === 'travis' ) {
			return lint.lintFiles( this.async(), type );
		}
		grunt.task.run( [ 'jshint', 'eslint' ] );
	} );

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
