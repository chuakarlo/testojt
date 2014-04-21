'use strict';

// Load core modules
var path = require( 'path' );

// Load other modules
var github = require( '../github/authenticate' );
var filter = require( './filter' );
var jshint = require( './jshint' );
var eslint = require( './eslint' );

module.exports = function ( done ) {
	console.log( 'linting code' );

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
			return done( error );
		}

		var filePaths = [];
		response.forEach( function ( value, index ) {
			if ( value.status !== 'removed' ) {
				filePaths.push( value.filename );
			}
		} );

		var files = filter( filePaths );

		jshint.lint( files );
		eslint.lint( files );

	} );

};