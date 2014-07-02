'use strict';

var bust = require( './lib/bust' );

module.exports = function ( grunt ) {

	grunt.registerTask( 'bust', function () {
		bust();
	} );

};
