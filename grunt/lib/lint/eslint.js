'use strict';

// Load other modules
var eslint = require( 'eslint' );
var filter = require( './filter' );
var diff   = require( './diff' );

var lint = function ( files, done ) {
	var code = eslint.cli.execute( [ null, null ].concat( files ) );

	if ( code ) {
		throw new Error( 'ESLint errors were found.' );
	}

	if ( typeof done === 'function' ) {
		done();
	}
};

var git = function ( done ) {

	diff( function ( stdout ) {
		lint( filter( stdout.split( '\n' ) ), done );
	} );

};

module.exports = {
	'lint' : lint,
	'git'  : git
};