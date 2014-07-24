define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/messages/templates/emptyMessage.html' );

	return Marionette.ItemView.extend( {
		'template'  : _.template( template ),
		'className' : 'empty-message row'
	} );
} );
