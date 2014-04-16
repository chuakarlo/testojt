'use strict';

// Load core modules
var path = require( 'path' );

// Load other modules
var async    = require( 'async' );
var mustache = require( 'mustache' );
var JSHINT   = require( 'jshint' ).JSHINT;
var comment  = require( './lib/comment' );
var github   = require( '../github/authenticate' );

require( 'colors' );

// Load config
var config   = require( '../../config' );
var jshintrc = config.jshintrc;
var globals  = jshintrc.globals;

// JSHINT doesn't like being passed `globals` as part of the second argument, `options`.
delete jshintrc.globals;

module.exports = function ( done ) {
	console.log( 'linting code' );

	var user, branch, sha, jsFiles;

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

	async.series( [

		// Get pull request info
		function ( callback ) {
			console.log( 'getting pull request info' );

			github.pullRequests.get( {
				'user'   : 'School-Improvement-Network',
				'repo'   : repo,
				'number' : issue
			}, function ( error, response ) {
				if ( error ) {
					return callback( error );
				}

				user   = response.user.login;
				branch = response.head.ref;
				sha    = response.head.sha;

				callback( error );
			} );
		},

		// Get the files changed in the commit
		function ( callback ) {
			console.log( 'getting files change in commit' );

			github.pullRequests.getFiles( {
				'user'   : 'School-Improvement-Network',
				'repo'   : repo,
				'number' : issue
			}, function ( error, response ) {
				if ( error ) {
					return callback( error );
				}

				var filePaths = [];

				response.forEach( function ( value, index ) {
					if ( value.status !== 'removed' ) {
						filePaths.push( value.filename );
					}
				} );

				jsFiles = filePaths.filter( function ( file ) {
					return ( path.extname( file ) === '.js' || path.extname( file ) === 'json' ) && !file.match( config.ignoredPaths.join( '|' ) );
				} );

				callback();
			} );
		},

		// Run JSHint on each file in the commit
		function ( callback ) {
			var jshintErrors = [];

			console.log( mustache.render( 'Getting file contents for {{length}} files.', jsFiles ) );

			// Get the file contents for each file in the commit
			async.each( jsFiles, function ( file, callback ) {

				github.repos.getContent( {
					'user' : user,
					'repo' : repo,
					'path' : file,
					'ref'  : sha
				}, function ( error, response ) {

					if ( error ) {
						return callback( error );
					}

					var content = new Buffer( response.content, 'base64' ).toString( 'ascii' );

					JSHINT( content, jshintrc, globals );

					if ( !JSHINT.errors.length ) {
						console.log( file.green );

						return callback();
					}

					console.log( file.red.bold );

					JSHINT.errors.forEach( function ( error, index ) {
						if ( !error || !error.reason ) {
							return;
						}

						console.log( ( '\t' + error.line + ':' ).red, error.reason.red );
					} );

					JSHINT.errors.forEach( function ( value, index ) {
						if ( !value || !value.reason ) {
							return;
						}

						value.reason = value.reason.replace( /'/g,'`' );

						var data = {
							'file'   : file,
							'link'   : response._links.html,
							'line'   : value.line,
							'reason' : value.reason
						};

						jshintErrors.push( {
							'file'   : file,
							'line'   : data.line,
							'link'   : mustache.render( '[{{{file}}}]({{{link}}}#L{{{line}}})', data ),
							'reason' : mustache.render( '{{{.}}}', data.reason )
						} );

					} );

					callback();

				} );

			}, function ( error ) {
				if ( error ) {
					return callback( error );
				}

				if ( !jshintErrors.length ) {
					return comment.jshint.success( {
						'user'  : user,
						'repo'  : repo,
						'issue' : issue
					}, callback );
				}

				return comment.jshint.failure( {
					'user'         : user,
					'repo'         : repo,
					'issue'        : issue,
					'jshintErrors' : jshintErrors
				}, callback );
			} );

		}

	], function ( error ) {
		if ( error ) {
			console.log( '\n\n\n\n', error );
			throw new Error( error );
		}

		done();
	} );

};