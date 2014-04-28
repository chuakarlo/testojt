'use strict';

// Load other modules
var filter = require( '../filter' );
var jshint = require( './jshint' );
var eslint = require( './eslint' );

var getFiles = {
	'travis' : require( '../github/getFiles' ),
	'file'   : require( '../args' )
};

module.exports = function ( done, type ) {
	console.log( 'linting code' );

	getFiles[ type ]( function ( paths ) {
		var files = filter( paths );

		jshint.lint( files );
		eslint.lint( files );

		done();
	} );

};
