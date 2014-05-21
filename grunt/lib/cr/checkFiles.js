'use strict';

// Load other modules
var filter = require( '../filter' );
var report = require( './report' );

var getFiles = {
	'file'   : require( '../args' ),
	'travis' : require( '../github/getFiles' )
};

module.exports = function ( done, type ) {
	console.log( 'running code complexity code' );

	getFiles[ type ]( function ( paths ) {
		var files = filter( paths, 'ignoredPathsForComplexity' );

		report( files );

		done();
	} );

};
