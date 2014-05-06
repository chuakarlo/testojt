define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {

		'template' : _.template( 'You do not have privileges to view this page' ),

		'className' : 'text-center'

	} );

} );
