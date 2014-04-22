'use strict';

// Load other modules
var getFiles = require( '../github/getFiles' );
var filter   = require( '../filter' );
var jshint   = require( './jshint' );
var eslint   = require( './eslint' );

module.exports = function ( done ) {
	console.log( 'linting code' );

	getFiles( function ( paths ) {
		var files = filter( paths );

		jshint.lint( files );
		eslint.lint( files );

		done();
	} );

};