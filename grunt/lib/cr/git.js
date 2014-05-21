'use strict';

// Load other modules
var report = require( './report' );
var filter = require( '../filter' );
var diff   = require( '../diff' );

function git ( callback ) {

	diff( function ( files ) {
		if ( !files ) {
			return callback();
		}

		report( filter( files, 'ignoredPathsForComplexity' ), callback );
	} );

}

module.exports = git;
