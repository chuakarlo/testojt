'use strict';

// Load core modules
var fs     = require( 'fs' );
var path   = require( 'path' );

// Load other modules
var grunt  = require( 'grunt' );
var JSHINT = require( 'jshint' ).JSHINT;
var filter = require( '../filter' );
var diff   = require( '../diff' );
var cb     = require( '../cb' );

require( 'colors' );

// Load config
var config   = require( '../../config' );
var jshintrc = config.jshintrc;
var globals  = jshintrc.globals;

function lint ( files, callback ) {
	console.log(); console.log( 'JSHint:'.bold );

	if ( !files.length ) {
		console.log( '  No files for JSHint to lint.' );

		return cb( callback );
	}

	var errors = 0;

	files.forEach( function ( file, index ) {
		var content;

		var filePath = path.resolve( process.cwd(), file );

		try {
			content = fs.readFileSync( filePath, 'utf8' );
		} catch ( error ) {
			return console.log( ( 'Could not read file ' + filePath ).red );
		}

		JSHINT( content, jshintrc, globals );

		if ( !JSHINT.errors.length ) {
			return;
		}

		console.log(); console.log( file.underline );

		JSHINT.errors.forEach( function ( error, index ) {
			if ( !error || !error.reason ) {
				return;
			}

			errors ++;

			console.log( ( '  ' + error.line + ':' + error.character ).grey + '\terror\t'.red + error.reason );
		} );

	} );

	if ( errors ) {
		grunt.fail.fatal( 'JSHint errors were found.' );
	}

	console.log( '  No JSHint errors found.' );

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
