'use strict';

// Load other modules
var eslint = require( 'eslint' );
var filter = require( '../filter' );
var diff   = require( '../diff' );

function cb ( callback ) {
	if ( typeof callback === 'function' ) {
		callback();
	}
}

function lint ( files, callback ) {

	if ( !files.length ) {
		console.log( '  No files for ESLint to lint.' );

		return cb( callback );
	}

	var code = eslint.cli.execute( [ null, null ].concat( files ) );

	if ( code ) {
		throw new Error( 'ESLint errors were found.' );
	}

	console.log( '  No ESLint errors found.' );

	cb( callback );
}

function git ( callback ) {

	diff( function ( files ) {
		if ( !files ) {
			return callback();
		}

		lint( filter( files ), callback );
	} );

}

module.exports = {
	'lint' : lint,
	'git'  : git
};
