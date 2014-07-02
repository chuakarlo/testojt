'use strict';

var meta = require( './lib/meta-data' );

module.exports = function ( grunt ) {

	grunt.registerTask( 'meta-data', function () {
		meta( this.async() );
	} );

};
