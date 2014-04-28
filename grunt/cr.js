'use strict';

var cr = require( './lib/cr' );

module.exports = function ( grunt ) {

	grunt.registerTask( 'cr', function ( type ) {
		console.log(); console.log( 'Complexity Report:'.bold );

		if ( type === 'file' || type === 'travis' ) {
			return cr.checkFiles( this.async(), type );
		}

		cr.git( this.async() );
	} );

};
