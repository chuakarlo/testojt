define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Vent       = require( 'Vent' );
	var Session    = require( 'Session' );
	var template   = require( 'text!templates/users/loginView.html' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),

		'events' : {
			'submit' : 'login'
		},

		'ui' : {
			'username' : 'input[type=text]',
			'password' : 'input[type=password]',
			'loginBtn' : 'input[type=submit]'
		},

		'login' : function ( event ) {

			event.preventDefault();

			var username = this.ui.username.val();
			var password = this.ui.password.val();

			var valid = true;

			if ( !username || !password ) {
				valid = false;
			}

			if ( valid ) {

				Session.fetch( {
					'username' : username,
					'password' : password,
					'success'  : function ( jqXHR, status, error ) {

						Vent.trigger( 'AppController:showSessionInfo', {} );

					}.bind( this ),

					'error'    : function ( jqXHR, status, error ) {
						// TODO: error handling
					}.bind( this )
				} );

			// else no input value, TODO: error handling
			}
		}

	} );

} );