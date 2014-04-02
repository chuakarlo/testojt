define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Session    = require( 'Session' );
	var template   = require( 'text!user/templates/login/loginView.html' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),

		'events' : {
			'submit' : 'login',
			'click @ui.remember' : 'rememberMe'
		},

		'ui' : {
			'username' : 'input[type=text]',
			'password' : 'input[type=password]',
			'remember' : 'input[type="checkbox"]'
		},

		onRender : function() {
			// If the user selected the remember me option,
			// populate the username for them.
			if ( $.cookie( 'remember' ) === 'true' ) {
				this.ui.remember.prop( 'checked', 'checked' );
				this.ui.username.val( $.cookie( 'UID' ) );
			}
		},

		'rememberMe' : function( event ) {
			// if the checkbox is checked, set the remember cookie,
			// else remove it.
			if ( this.ui.remember.is( ':checked' ) ) {
				Session.setCookie( 'remember', true );
			} else {
				Session.removeCookie( 'remember' );
			}
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
					'error'    : function ( jqXHR, status, error ) {
						// TODO: error handling
					}.bind( this )
				} );

			// else no input value, TODO: error handling
			}
		}

	} );

} );
