'use strict';

var params   = require( 'minimist' )( process.argv.slice( 2 ) );
var readdirp = require( 'readdirp' );

module.exports = function ( callback ) {
	var files = [ ];

	if ( params.dir ) {
		return readdirp( { 'root' : params.dir, 'fileFilter' : '*.js' },
			function ( fileEntry ) {
				if ( fileEntry.stat.isFile() ) {
					files.push( fileEntry.fullPath );
				}
			},
			function ( errors ) {
				if ( errors ) {
					return console.log( errors );
				}
				callback( files );
		} );
	}

	callback( params.file ? files.concat( params.file ) : [ ] );
};
