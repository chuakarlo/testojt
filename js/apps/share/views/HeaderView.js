define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template = require( 'text!share/templates/HeaderTemplate.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'tagName' : 'li'

	} );

} );
