'use strict';

// Load core modules
var fs   = require( 'fs' );
var path = require( 'path' );

// Load other modules
var diff = require( '../diff' );

require( 'colors' );

function cb ( callback ) {
	if ( typeof callback === 'function' ) {
		callback();
	}
}

function trailing ( files, callback ) {
	var errors = [ ];

	if ( !files.length ) {
		return cb( callback );
	}

	files.forEach( function ( file, index ) {
		var contents = fs.readFileSync( path.join( process.cwd(), file ), 'utf8' );
		var match    = new RegExp( /[\t ]+$/m ).test( contents );

		if ( match ) {
			errors.push( file );
		}
	} );

	if ( errors.length ) {
		errors = errors.join( '\n' );
		throw new Error( 'Trailing white space was found:\n' + errors );
	}

	console.log( '  No trailing white space found.' );

	cb( callback );

}

function git ( callback ) {

	diff( function ( files ) {
		if ( !files ) {
			return callback();
		}

		trailing( files, callback );
	} );

}

module.exports = {
	'trailing' : trailing,
	'git'      : git
};