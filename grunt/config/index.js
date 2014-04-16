'use strict';

// Load core modules
var fs   = require( 'fs' );
var path = require( 'path' );

module.exports = {
	'ignoredPaths' : [ 'public/connect', 'public/js/libs/', 'js/libs/', 'node_modules/', 'test/', 'migrate/', 'resources/', 'data/' ],
	'jshintrc'     : JSON.parse( fs.readFileSync( path.join( process.cwd(), '.jshintrc' ), 'utf8' ) ),

	'github' : {
		'username' : 'AWESOM-O',
		'password' : 'e32ce31016d6eeebb3dd64c4fffbca298459bad2'
	}
};