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
	require( 'backbone.stickit' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),

		'events' : {
			'submit'             : 'login',
			'click @ui.remember' : 'rememberMe'
		},

		'ui' : {
			'remember' : 'input[type="checkbox"]'
		},

		'bindings' : {
			'[name="Username"]' : 'Username',
			'[name="Password"]' : 'Password'
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

		onRender : function () {
			// If the user selected the remember me option,
			// populate the username for them.
			if ( $.cookie( 'remember' ) === 'true' ) {
				this.ui.remember.prop( 'checked', 'checked' );
				this.model.set( 'Username', $.cookie( 'UID' ) );
			}

			this.stickit();
		},

		'rememberMe' : function ( event ) {
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

			if ( this.model.isValid( true ) ) {
				var l = Ladda.create( document.querySelector( '#login-button' ) );
				l.start();

				Session.login( {
					'username' : this.model.get( 'Username' ),
					'password' : this.model.get( 'Password' ),
					'error'    : function ( jqXHR, status, error ) {
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
