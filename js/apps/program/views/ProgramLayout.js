define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/ProgramLayout.html' );

	return Marionette.Layout.extend( {

		'tagName' : 'section',

		'id' : 'program-page',

		'template' : _.template( template ),

		'regions' : {
			'programDetails' : '#pp-program-details',
			'segmentsRegion' : '#pp-program-segments'
		}

	} );

} );
