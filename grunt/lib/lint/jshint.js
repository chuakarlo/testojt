'use strict';

// Load core modules
var exec   = require( 'child_process' ).exec;
var fs     = require( 'fs' );
var path   = require( 'path' );

// Load other modules
var JSHINT = require( 'jshint' ).JSHINT;

require( 'colors' );

// Load config
var config   = require( '../../config' );
var jshintrc = config.jshintrc;
var globals  = jshintrc.globals;

module.exports = function ( done ) {
	var errors  = 0;
	var command = 'git diff --name-only --staged';

	exec( command, function ( error, stdout, stderr ) {
		if ( error ) {
			throw new Error( error );
		}

		if ( !stdout ) {
			return console.log( 'No files to lint.' );
		}

		// Filter empty strings; non JS and JSON files; and folders not being ignored
		var files = stdout.split( '\n' ).filter( String ).filter( function ( file ) {
			return ( path.extname( file ) === '.js' || path.extname( file ) === 'json' ) && !file.match( config.ignoredPaths.join( '|' ) );
		} );

		files.forEach( function ( file, index ) {
			var content;

			var filePath = path.join( process.cwd(), file );

			if ( !fs.existsSync( filePath ) ) {
				return;
			}

			try {
				content = fs.readFileSync( filePath, 'utf8' );
			} catch ( error ) {
				return console.log( ( 'Could not read file ' + filePath ).red );
			}

			JSHINT( content, jshintrc, globals );

			if ( !JSHINT.errors.length ) {
				return;
			}

			console.log();
			console.log( file.underline );

			JSHINT.errors.forEach( function ( error, index ) {
				if ( !error || !error.reason ) {
					return;
				}

				errors++;

				console.log( ( '  ' + error.line + ':' + error.character ).grey, ' error '.red, error.reason );
			} );

		} );

		if ( errors ) {
			throw new Error( 'JSHint errors were found.' );
		}

		done();

	} );
};