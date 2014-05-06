define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template = require( 'text!learningProgression/templates/learningProgression.html' );

	return Marionette.Layout.extend( {

		'template'  : _.template( template ),

		'regions' : {
			'loading' : '#learning-progression-loading'
		}

	} );

} );
