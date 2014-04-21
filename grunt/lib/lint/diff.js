'use strict';

// Load core modules
var exec = require( 'child_process' ).exec;

module.exports = function ( callback ) {
	var command = 'git diff --name-only --staged';

	exec( command, function ( error, stdout, stderr ) {
		if ( error ) {
			throw new Error( error );
		}

		if ( !stdout ) {
			return console.log( 'No files to lint.' );
		}

		callback( stdout );

	} );

};