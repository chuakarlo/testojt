'use strict';

// Load core modules
var fs   = require( 'fs' );
var path = require( 'path' );

module.exports = {
	'ignoredPathsForComplexity' : [ 'public/js/libs/', 'js/libs/', 'node_modules/', 'test/', 'resources/', 'data/', 'config/' ],
	'ignoredPathsForLinting'    : [ 'public/js/libs/', 'js/libs/', 'node_modules/', 'resources/' ],
	'jshintrc'                  : JSON.parse( fs.readFileSync( path.join( process.cwd(), '.jshintrc' ), 'utf8' ) ),

	'github' : {
		'username' : 'AWESOM-O',
		'password' : 'e32ce31016d6eeebb3dd64c4fffbca298459bad2'
	}
};
