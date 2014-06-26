define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!user/templates/login/forgotPasswordFormView.html' );
	var $          = require( 'jquery' );
	require( 'validation' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'events' : {
			'submit form' : 'onSubmitForm'
		},

		'onSubmitForm' : function ( event ) {
			event.preventDefault( );
			var data = this.serialize();
			this.model.set( data , { validate : true } );
		},

		'serialize' : function () {
			return {
				email : $( 'input[ name = "email" ]' ).val()
			};
		}

	} );

} );
