'use strict';

// Load other modules
var grunt  = require( 'grunt' );
var eslint = require( 'eslint' );
var filter = require( '../filter' );
var diff   = require( '../diff' );
var cb     = require( '../cb' );

function lint ( files, callback ) {
	console.log(); console.log( 'ESLint:'.bold );

	if ( !files.length ) {
		console.log( '  No files for ESLint to lint.' );

		return cb( callback );
	}

	var code = eslint.cli.execute( [ null, null ].concat( files ) );

	if ( code ) {
		grunt.fail.fatal( 'ESLint errors were found.' );
	}

	console.log( '  No ESLint errors found.' );

	cb( callback );
}

function git ( callback ) {

	diff( function ( files ) {
		if ( !files ) {
			return cb( callback );
		}

		lint( filter( files ), callback );
	} );

}

module.exports = {
	'lint' : lint,
	'git'  : git
};
