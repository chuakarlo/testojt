define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template   = require( 'text!videoPlayer/templates/error.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'class'    : 'error'

	} );

} );
