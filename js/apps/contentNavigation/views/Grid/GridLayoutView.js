define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../../templates/Grid/GridLayoutViewTemplate.html' );

	return Marionette.Layout.extend( {
		'template' : _.template( template ),
		'regions'  : {
			'mainRegion' : '#grid-content'
		}
	} );

} );