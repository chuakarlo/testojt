'use strict';

// Load core modules
var fs     = require( 'fs' );
var path   = require( 'path' );
var crypto = require( 'crypto' );

module.exports = function bustCache () {
	var html    = fs.readFileSync( path.join( process.cwd(), 'index-template.html' ), 'utf8' );
	var matches = html.match( /\{[^}]+\}/g );

	matches.forEach( function ( match, index ) {
		var json     = JSON.parse( match );
		var contents = fs.readFileSync( path.join( process.cwd(), json.bust ), 'utf8' );
		var hash     = crypto.createHash( 'md5' ).update( contents ).digest( 'hex' );

		var file = {
			'match' : match,
			'file'  : json.bust,
			'hash'  : hash
		};

		html = html.replace( file.match, file.file + '?_bust=' + file.hash );
	} );

	fs.writeFileSync( path.join( process.cwd(), 'index.html' ), html );
};
