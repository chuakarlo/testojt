'use strict';

// Load modules and config
var mustache = require( 'mustache' );
var _        = require( 'lodash' );
var facts    = require( './data/facts' );
var github   = require( '../github/authenticate' );

var jshint = {

	'success' : function ( options, callback ) {
		var user  = options.user;
		var repo  = options.repo;
		var issue = options.issue;

		var comment = [
			'@{{user}},',
			'',
			'I did not find any JSHint errors. Success! Here is a random animal fact for a job well done:',
			'> {{fact}}'
		].join( '\n' );

		var body = mustache.render( comment , { 'user' : user, 'fact' : facts[ _.random( 0, facts.length ) ] } );

		return github.issues.createComment( {
			'user'   : 'School-Improvement-Network',
			'repo'   : repo,
			'number' : issue,
			'body'   : body
		}, function ( error, response ) {
			callback( error );
		} );

	},

	'failure' : function ( options, callback ) {
		var user   = options.user;
		var repo   = options.repo;
		var issue  = options.issue;
		var errors = options.errors;

		console.log( mustache.render( 'There were {{.}} JSHINT errors found.', errors.length ) );

		var review = 'I was reviewing your pull request and I saw';

		if ( errors.length > 1 ) {
			review += ' a few [JSHint](http://www.jshint.com) errors:';
		} else {
			review += ' a [JSHint](http://www.jshint.com) error:';
		}

		var comment = [
			'@{{user}},',
			'',
			review,
			'',
			'{{{header1}}}',
			'{{{header2}}}',
			'{{#errors}}| {{{link}}} | {{line}} | {{{reason}}} |\n{{/errors}}',
			'Need a [`.jshintrc`](https://github.com/School-Improvement-Network/travis-scripts/blob/master/.jshintrc)? In addition to following the lint standards, make sure you follow the [coding conventions](https://github.com/School-Improvement-Network/platform/wiki/Coding-Conventions).'
		].join( '\n' );

		var body = mustache.render( comment , {
			'user'    : user,
			'header1' : '| File | Line | Reason |',
			'header2' : '| --- | :---: | --- |',
			'errors'  : errors
		} );

		github.issues.createComment( {
			'user'   : 'School-Improvement-Network',
			'repo'   : repo,
			'number' : issue,
			'body'   : body
		}, function ( error, response ) {
			var arg = error || errors.length;

			callback( arg );
		} );

	}

};

var eslint = {
	'success' : function ( options, callback ) {
		// code
	},

	'failure' : function ( options, callback ) {
		var user   = options.user;
		var repo   = options.repo;
		var issue  = options.issue;
		var stdout = options.stdout;

		// console.log( mustache.render( 'There were {{.}} JSHINT errors found.', errors.length ) );

		var review = 'I was reviewing your pull request and I saw a few [ESLint](http://eslint.org) errors:';

		var comment = [
			'@{{user}},',
			'',
			review,
			'',
			'```',
			'{{{stdout}}}',
			'```',
			'Need a [`.eslintrc`](https://github.com/School-Improvement-Network/travis-scripts/blob/master/.eslintrc)? In addition to following the lint standards, make sure you follow the [coding conventions](https://github.com/School-Improvement-Network/platform/wiki/Coding-Conventions).'
		].join( '\n' );

		var body = mustache.render( comment , {
			'user'   : user,
			'stdout' : stdout
		} );

		github.issues.createComment( {
			'user'   : 'School-Improvement-Network',
			'repo'   : repo,
			'number' : issue,
			'body'   : body
		}, function ( error, response ) {
			var arg = error || error.length;

			callback( arg );
		} );
	}

};

module.exports = {
	'jshint' : {
		'success' : jshint.success,
		'failure' : jshint.failure
	},

	'eslint' : {
		'success' : eslint.success,
		'failure' : eslint.failure,
	}
};