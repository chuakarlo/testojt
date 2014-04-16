'use strict';

// Load core modules
var fs     = require( 'fs' );
var path   = require( 'path' );

// Load other modules
var JSHINT = require( 'jshint' ).JSHINT;
var filter = require( './filter' );
var diff   = require( './diff' );

require( 'colors' );

// Load config
var config   = require( '../../config' );
var jshintrc = config.jshintrc;
var globals  = jshintrc.globals;

var lint = function ( files, done ) {
	var errors = 0;

	files.forEach( function ( file, index ) {
		var content;

		var filePath = path.join( process.cwd(), file );

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