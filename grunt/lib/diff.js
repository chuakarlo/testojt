'use strict';

// Load core modules
var exec = require( 'child_process' ).exec;

// Load other modules
var _ = require( 'lodash' );

module.exports = function ( callback ) {
	var command = 'git diff --name-only --staged';

	exec( command, function ( error, stdout, stderr ) {
		if ( error ) {
			throw new Error( error );
		}

		if ( !stdout ) {
			console.log( 'No files return from: ' + command );

			return callback();
		}

		var array = _.without( stdout.split( '\n' ), '', null, undefined );

		callback( array );

	} );

};