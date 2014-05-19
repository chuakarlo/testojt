'use strict';

var whitespace = require( './lib/whitespace' );

require( 'colors' );

module.exports = function ( grunt ) {

	grunt.registerTask( 'whitespace', function () {
		console.log(); console.log( 'Whitespace:'.bold );

		whitespace.git( this.async() );
	} );

};
