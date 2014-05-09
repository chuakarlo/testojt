define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!../templates/ErrorView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'className' : 'error-message-container',

		'initialize' : function ( options ) {
			this.message = options.message;
		},

		'serializeData' : function () {
			return {
				'message' : this.message
			};
		}

	} );

} );
