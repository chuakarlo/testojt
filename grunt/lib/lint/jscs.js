'use strict';

// Load other modules
var vow = require( 'vow' );

// Load other modules
var grunt      = require( 'grunt' );
var Checker    = require( 'jscs/lib/checker' );
var jscsConfig = require( 'jscs/lib/cli-config' );
var filter     = require( '../filter' );
var diff       = require( '../diff' );
var cb         = require( '../cb' );

function lint (files, callback ) {
	console.log(); console.log( 'JSCS:'.bold );

	if ( !files.length ) {
		console.log( '  No files for JSCS to lint.' );

		return cb( callback );
	}

	var checker = new Checker();
	var config = jscsConfig.load( '.jscsrc' );

	checker.registerDefaultRules();
	checker.configure( config );

	var errors = 0;
	var checks = [ ];

	files.forEach( function ( file, index ) {
		checks.push( checker.checkFile( file ) );
	} );

	vow.allResolved( checks ).spread( function () {

		checks.forEach( function ( check, index ) {
			if ( check._res._errorList.length ) {
				console.log(); console.log( check._res._file._filename.underline );

				check._res._errorList.forEach( function ( error, index ) {
					console.log( ( '  ' + error.line + ':' + error.column ).grey + '\terror\t'.red + error.message );

					errors++;
				} );
			}
		} );

		if ( errors ) {
			grunt.fail.fatal( 'JSCS errors were found.' );
		}

		console.log( '  No JSCS errors found.' );

		cb( callback );

	} );

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
