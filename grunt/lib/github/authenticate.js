'use strict';

// Load modules and config
var GitHubApi = require( 'github' );
var config    = require( '../../config' );

var github = new GitHubApi( {
	'version' : '3.0.0',
	'timeout' : 5000,
	'debug'   : false
} );

github.authenticate( {
	'type'     : 'basic',
	'username' : config.github.username,
	'password' : config.github.password
} );

module.exports = github;