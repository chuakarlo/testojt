define( function ( require ) {
	'use strict';

	var LoginView = require( 'user/views/login/LoginView' );
	var App       = require( 'App' );

	App.module( 'User.Login', function ( Login, App ) {

		Login.Controller = {

			'showLogin' : function () {
				var login = new LoginView();
				App.content.show( login );
			}

		};

	} );

} );
