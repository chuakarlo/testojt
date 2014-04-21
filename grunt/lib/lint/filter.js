'use strict';

// Load core modules
var fs   = require( 'fs' );
var path = require( 'path' );

// Load config
var config = require( '../../config' );

module.exports = function ( files ) {
	return files.filter( String ).filter( function ( file ) {
		var exists = fs.existsSync( path.join( process.cwd(), file ) );

		return exists && ( path.extname( file ) === '.js' || path.extname( file ) === 'json' ) && !file.match( config.ignoredPaths.join( '|' ) );
	} );
};