'use strict';

// Load core modules
var path  = require( 'path' );
var fs    = require( 'fs' );

// Load other modules
var plato = require( 'plato' );
var glob  = require( 'glob' );

module.exports = function () {
	var cwd       = process.cwd();
	var platorc   = JSON.parse( fs.readFileSync( path.join( cwd, '.platorc' ) ) );
	var pattern   = platorc.directories.join( '|' ) ;

	if ( platorc.exclude ) {
		platorc.exclude = new RegExp( platorc.exclude );
	}

	var metaFolder = path.resolve( path.join( '../meta/plato' ) );
	var output     = path.join( metaFolder, platorc.title );
	var exists     = fs.existsSync( metaFolder );

	if ( !exists ) {
		throw new Error( 'The repository folder for tracking, `meta`, does not exist: ' + metaFolder );
	}

	console.log( '- output directory is:', output );

	var options = {
		'sync'   : true,
		'nocase' : true
	};

	glob( pattern, options, function ( error, files ) {
		if ( error ) {
			throw new Error( error );
		}

		console.log( '- running Plato for', files.length ,'file(s).' );

		plato.inspect( files, output, platorc, function ( report ) {
			if ( !report ) {
				throw new Error( 'plato had an error?' );
			}

			console.log( '- finished running Plato' );
		} );
	} );
};