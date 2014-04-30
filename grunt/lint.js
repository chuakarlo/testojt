'use strict';

var lint = require( './lib/lint' );

require( 'colors' );

module.exports = function ( grunt ) {

	grunt.registerTask( 'lint', function ( type ) {
		if ( type === 'file' || type === 'travis' ) {
			return lint.lintFiles( type, this.async() );
		}

		grunt.task.run( [ 'jscs', 'jshint', 'eslint' ] );
	} );

	// Do not use directly, use the `lint` task instead
	grunt.registerTask( 'jscs', function () {
		lint.jscs( this.async() );
	} );

	// Do not use directly, use the `lint` task instead
	grunt.registerTask( 'jshint', function () {
		lint.jshint( this.async() );
	} );

	// Do not use directly, use the `lint` task instead
	grunt.registerTask( 'eslint', function () {
		lint.eslint( this.async() );
	} );

};
