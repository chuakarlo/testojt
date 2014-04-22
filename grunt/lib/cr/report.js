'use strict';

// Load core modules
var fs = require( 'fs' );

// Load other modules
var _         = require( 'lodash' );
var escomplex = require( 'escomplex-js' );
var filter    = require( '../filter' );
var check     = require( './check' );
var formatter = require( './formatter' );

require( 'colors' );

// Config and options
var options = { 'newmi' : true };
var verbose = process.argv.indexOf( '--details' ) > -1;

function report ( paths, callback ) {
	var warnings = [ ];
	var errors   = [ ];
	var files    = filter( paths );

	files.forEach( function ( file, index ) {
		var ast = {
			'path' : file,
			'code' : fs.readFileSync( file, 'utf8' )
		};

		var result = escomplex.analyse( [ ast ], options );

		result.reports.forEach( function ( report, index ) {
			var results = [ ];
			var details = _.clone( report.aggregate );

			delete details.halstead.operators.identifiers;
			delete details.halstead.operands.identifiers;

			details.maintainability = report.maintainability;
			details.functions       = report.functions.length;
			details.dependencies    = report.dependencies.length;

			if ( verbose ) {
				console.log( formatter.results( report, details ) );
			}

			var maintainability = check( 'maintainability', report.maintainability, report );
			if ( maintainability ) {
				results.push( maintainability );
			}

			var logicalSloc = check( 'logicalSloc', report.aggregate.sloc.logical, report );
			if ( logicalSloc ) {
				results.push( logicalSloc );
			}

			var cyclomatic = check( 'cyclomatic', report.aggregate.cyclomatic, report );
			if ( cyclomatic ) {
				results.push( cyclomatic );
			}

			var warn = _.filter( results, { 'level' : 'warn' } );
			if ( warn.length ) {
				warnings = warnings.concat( warn );
			}

			var error = _.filter( results, { 'level' : 'error' } );
			if ( error.length ) {
				errors = errors.concat( error );
			}

		} );

	} );

	if ( warnings.length || errors.length ) {
		console.log();

		console.log( 'Warnings:'.bold.yellow );
		console.log( formatter.errors( warnings, 'yellow' ) );

		console.log( 'Errors:'.bold.red );
		console.log( formatter.errors( errors, 'red' ) );

		console.log( formatter.description() );
		console.log( 'Run `grunt cr --details` for a more verbose output of the complexity report.'.bold );

		if ( errors.length ) {
			throw new Error( 'Code is too complex.' );
		}

	} else {
		console.log( 'No complexity errors found.\n' );
	}

	callback();

}

module.exports = report;