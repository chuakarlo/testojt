define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var _          = require( 'underscore' );
	var template   = require( 'text!../templates/ErrorView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'className' : 'error-message-container',

		'initialize' : function ( options ) {
			this.message = options.message;
			this.flash   = options.flash || false;
		},

		'serializeData' : function () {
			return {
				'message' : this.message
			};
		},

		'onShow' : function ( ) {

			if ( this.flash ) {

				App.vent.trigger( 'flash:message', {
					'message' : this.flash
				} );

			}
		}

	} );

} );
