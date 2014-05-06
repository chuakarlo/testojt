define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!../templates/flashMessage.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'ui' : {
			'closeButton' : '.flash-close'
		},

		'events' : {
			'click @ui.closeButton' : 'closeView'
		},

		'initialize' : function ( options ) {
			this.message = options.message;
		},

		'serializeData' : function () {
			return {
				'message' : this.message
			};
		},

		'closeView' : function () {
			this.close();
		}

	} );

} );
