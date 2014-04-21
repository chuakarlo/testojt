define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {


		'template' : _.template( '<%= message %>' ),

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