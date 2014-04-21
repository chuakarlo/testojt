'use strict';

// Load core modules
var path = require( 'path' );
var fs   = require( 'fs' );
var exec = require( 'child_process' ).exec;

// Load other modules
var eslint = require( 'eslint' );

// Load config
var config = require( '../../config' );

module.exports = function ( done ) {
	var command = 'git diff --name-only --staged';

	exec( command, function(error, stdout, stderr) {
		if ( error ) {
			throw new Error( error );
		}

		if ( !stdout ) {
			return console.log( 'No files to lint.' );
		}

		// Filter empty strings; non JS and JSON files; and folders not being ignored
		var files = stdout.split( '\n' ).filter( String ).filter( function ( file ) {
			var exists = fs.existsSync( path.join( process.cwd(), file ) );

			return exists && ( path.extname( file ) === '.js' || path.extname( file ) === 'json' ) && !file.match( config.ignoredPaths.join( '|' ) );
		} );

		var code = eslint.cli.execute( [ null, null ].concat( files ) );

		if ( code ) {
			throw new Error( 'ESLint errors were found.' );
		}

		done();

	} );

};