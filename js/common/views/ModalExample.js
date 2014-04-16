// Sample Modal view
define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/ModalExample.html' );

	return Marionette.ItemView.extend( {
		
		'template' : _.template( template ),

		// The only requirement for a modal view instance is the className
		// attribute listed below. See the ModalExample.html template for
		// template requirements.
		'className' : 'modal-dialog',

	} );

} );
