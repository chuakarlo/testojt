'use strict';

// Load core modules
var fs   = require( 'fs' );
var path = require( 'path' );

// Load other modules
var grunt = require( 'grunt' );

module.exports = function bustCache ( done ) {
	var release = grunt.option( 'release' ) || 'development';
	var html    = fs.readFileSync( path.join( process.cwd(), 'index.html' ), 'utf8' );
	var bugsnag = 'window.Bugsnag.releaseStage = \'' + release + '\';';

	html = html.replace( 'window.Bugsnag.releaseStage = \'development\';', bugsnag );

	fs.writeFileSync( path.join( process.cwd(), 'index.html' ), html );

	done();

};
