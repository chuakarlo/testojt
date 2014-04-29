'use strict';

module.exports = function ( grunt ) {

	grunt.registerTask( 'check', [ 'lint', 'whitespace', 'cr' ] );

};