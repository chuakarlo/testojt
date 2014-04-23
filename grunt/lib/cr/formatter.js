'use strict';

// Load other modules
var thresholds = require( './config' );

function description () {
	var stdout = [ ];

	Object.keys( thresholds ).forEach( function ( key ) {
		var threshold = thresholds[ key ];

		stdout.push( threshold.description );
		stdout.push( '' );
	} );

	return stdout.join( '\n' );
}

function results ( report, details ) {
	var stdout = [ ];

	stdout.push( '' );
	stdout.push( report.path.underline );

	stdout.push( '  Logical SLOC: ' + details.sloc.logical );
	stdout.push( '  Physical SLOC: ' + details.sloc.physical );
	stdout.push( '  Cyclomatic Complexity: ' + details.cyclomatic );

	stdout.push( '  Halstead ' );
	stdout.push( '    Length: ' + details.halstead.length );
	stdout.push( '    Vocabulary: ' + details.halstead.vocabulary );
	stdout.push( '    Difficulty: ' + details.halstead.difficulty );
	stdout.push( '    Volume: ' + details.halstead.volume );
	stdout.push( '    Effort: ' + details.halstead.effort );
	stdout.push( '    Bugs: ' + details.halstead.bugs );
	stdout.push( '    Time: ' + details.halstead.time );

	return stdout.join( '\n' );
}

function errors ( objects, color ) {
	if ( !objects.length ) {
		return '  No complexity errors found.\n';
	}

	var stdout = [ ];

	objects.forEach( function ( error, index ) {
		stdout.push( '  ' +  error.file[ color ].underline );
		stdout.push( '    ' +  error.message );
		stdout.push( '    ' +  'Actual: ' + error.actual );
		stdout.push( '    ' +  'Threshold: ' + error.threshold );
		stdout.push( '    ' +  '' );
	} );

	return stdout.join( '\n' );
}

module.exports = {
	'results'     : results,
	'errors'      : errors,
	'description' : description
};