'use strict';

// Load core modules
var fs   = require( 'fs' );
var path = require( 'path' );
var exec = require( 'child_process' ).exec;

// Load other modules
var moment = require( 'moment' );

module.exports = function bustCache ( done ) {
	var html = fs.readFileSync( path.join( process.cwd(), 'index.html' ), 'utf8' );

	exec( 'git log -1 --pretty=format:"Commit : %H | Date : %ad"', function ( error, stdout, stderr ) {
		if ( error ) {
			throw error;
		}

		var date = 'Compiled : ' + moment().format( 'ddd MMM D HH:mm:ss YYYY ZZ' );
		var meta = [ '<!--', date, stdout, '-->' ].join( ' | ' );

		html = html.replace( '<!-- META-DATA -->', meta );

		fs.writeFileSync( path.join( process.cwd(), 'index.html' ), html );

		done();
	} );

};
