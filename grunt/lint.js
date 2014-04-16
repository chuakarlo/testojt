'use strict';

var lint = require( './lib/lint' );

module.exports = function ( grunt ) {

	grunt.registerTask( 'lint', 'lint JS files', function () {
		lint( this.async() );
	} );

};