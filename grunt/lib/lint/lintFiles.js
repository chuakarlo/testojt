'use strict';

// Load other modules
var grunt  = require( 'grunt' );
var async  = require( 'async' );
var jscs   = require( './jscs' );
var jshint = require( './jshint' );
var eslint = require( './eslint' );
var filter = require( '../filter' );

var getFiles = {
	'travis' : require( '../github/getFiles' ),
	'file'   : require( '../args' )
};

module.exports = function ( type, done ) {
	console.log( 'linting code' );

	getFiles[ type ]( function ( paths ) {
		var files = filter( paths );

		async.series( [

			function ( callback ) {
				jscs.lint( files, callback );
			},

			function ( callback ) {
				jshint.lint( files, callback );
			},

			function ( callback ) {
				eslint.lint( files, callback );
			}

		], function ( error, results ) {
			if ( error ) {
				grunt.fail.fatal( error );
			}

			done();
		} );

	} );

};
