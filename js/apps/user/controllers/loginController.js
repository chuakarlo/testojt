define( function ( require ) {
	'use strict';

	var LoginView = require( 'user/views/login/LoginView' );
	var App       = require( 'App' );
	var Backone   = require( 'backbone' );

	App.module( 'User.Login', function ( Login, App ) {

		Login.Controller = {

			'showLogin' : function () {
				var login = new LoginView();
				App.content.show( login );
			},

			'showLoginError' : function ( error ) {
				this.showLogin();

				if ( Backone.history.fragment !== 'login' ) {
					App.navigate( 'login', { 'trigger' : true } );
				}

				// Show applicable message
				App.vent.trigger( 'flash:message', {
					'message' : error.DisplayText,
					'type'    : 'error'
				} );
			}

		};

	} );

} );
