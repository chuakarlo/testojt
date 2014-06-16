define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!user/templates/login/forgotPasswordFormView.html' );
	var Backbone   = require( 'backbone' );
	require( 'validation' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'events' : {
			'submit form' : 'onSubmitForm'
		},

		'onRender' : function () {
			this.$( 'input' ).placeholder();
		},

		'onSubmitForm' : function ( event ) {

			event.preventDefault( );
			var data      = Backbone.Syphon.serialize( this );
			this.model.set( data , { validate : true } );

		}

	} );

} );
