define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Ladda      = require( 'ladda' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var Session    = require( 'Session' );
	var template   = require( 'text!user/templates/login/loginView.html' );
	var App        = require( 'App' );

	require( 'validation' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),

		'events' : {
			'submit'                      : 'login',
			'click @ui.remember'          : 'rememberMe',
			'click .forgot-password-link' : 'forgotPassword'
		},

		'ui' : {
			'username' : '[name="Username"]',
			'password' : '[name="Password"]',
			'remember' : 'input[type="checkbox"]'
		},

		'forgotPassword' : function ( ) {
			App.navigate( 'forgotPassword', true );
		},

		'initialize' : function ( options ) {
			this.model = new Backbone.Model( {
				'Username' : '',
				'Password' : ''
			} );

			this.model.validation = {

				'Username' : {
					'required' : true
				},

				'Password' : {
					'required' : true
				}

			};

			Backbone.Validation.bind( this );
		},

		'onRender' : function () {
			// If the user selected the remember me option,
			// populate the username for them.
			if ( $.cookie( 'remember' ) ) {
				this.ui.remember.prop( 'checked', 'checked' );
				this.ui.username.val( $.cookie( 'remember' ) );
			}
		},

		'rememberMe' : function ( event ) {
			// if the checkbox is unchecked remove the cookie
			if ( !this.ui.remember.is( ':checked' ) ) {
				Session.removeCookie( 'remember' );
			}
		},

		'login' : function ( event ) {
			event.preventDefault();

			// manually set because stickit won't work when some browsers auto fill in information
			this.model.set( 'Password', this.ui.password.val() );
			this.model.set( 'Username', this.ui.username.val() );

			if ( this.model.isValid( true ) ) {
				var l = Ladda.create( document.querySelector( '#login-button' ) );
				l.start();

				Session.login( {
					'username' : this.model.get( 'Username' ),
					'password' : this.model.get( 'Password' ),
					'ladda'    : l,
					'remember' : this.ui.remember.is( ':checked' ),

					'error' : function ( jqXHR, status, error ) {
						l.stop();

						App.vent.trigger( 'flash:message', {
							'message' : 'An error occurred. Please try again later.'
						} );
					}.bind( this )
				} );
			}

		}

	} );

} );
