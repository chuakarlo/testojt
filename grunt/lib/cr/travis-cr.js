'use strict';

// Load other modules
var getFiles = require( '../github/getFiles' );
var filter   = require( '../filter' );
var cr       = require( './cr' );

module.exports = function ( done ) {
	console.log( 'running code complexity code' );

	getFiles( function ( paths ) {
		var files = filter( paths );

		cr.report( files, done );
	} );

};