'use strict';

// Load core modules
var fs             = require( 'fs' );
var path           = require( 'path' );
var isTextOrBinary = require('istextorbinary');

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
		var filePath = path.join( process.cwd(), file );

		// Only check text files
		if ( isTextOrBinary.isTextSync( filePath ) ) {
			try {
				var contents = fs.readFileSync( filePath, 'utf8' );
				var match    = new RegExp( /[\t ]+$/m ).test( contents );

				if ( match ) {
					errors.push( file );
				}
			} catch ( error ) {
				return console.log( ( '  Could not read file ' + filePath ).red );
			}
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
