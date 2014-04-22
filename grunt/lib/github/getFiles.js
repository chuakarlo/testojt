'use strict';

// Load core modules
var path = require( 'path' );

// Load other modules
var github = require( './authenticate' );

module.exports = function ( callback ) {
	var repo  = process.env.TRAVIS_REPO_SLUG    && path.basename( process.env.TRAVIS_REPO_SLUG );
	var issue = process.env.TRAVIS_PULL_REQUEST && JSON.parse( process.env.TRAVIS_PULL_REQUEST );

	if ( !repo ) {
		console.log( 'exiting because there is no repo' );
		return process.exit();
	}

	if ( !issue ) {
		console.log( 'exiting because there is no issue' );
		return process.exit();
	}

	github.pullRequests.getFiles( {
		'user'   : 'School-Improvement-Network',
		'repo'   : repo,
		'number' : issue
	}, function ( error, response ) {
		if ( error ) {
			throw new Error( Error );
		}

		var files = [ ];

		response.forEach( function ( value, index ) {
			if ( value.status !== 'removed' ) {
				files.push( value.filename );
			}
		} );

		callback( files );

	} );

};