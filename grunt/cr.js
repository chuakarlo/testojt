'use strict';

var cr = require( './lib/cr' );

module.exports = function ( grunt ) {

	grunt.registerTask( 'cr', function () {
		console.log(); console.log( 'Complexity Report:'.bold );

		cr.git( this.async() );
	} );

};