'use strict';

var plato = require( './lib/plato' );

module.exports = function ( grunt ) {

	grunt.registerTask( 'plato', function () {
		plato( this.async() );
	} );

};