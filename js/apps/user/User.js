define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );

	var Login   = require( './login/Login' );
	var Session = require( 'Session' );

	return function ( User, App ) {

		// load sub apps
		App.module( 'User.Login', Login );

		// configure routes
		User.Router = Marionette.AppRouter.extend( {

			'appRoutes' : {
				'login' : 'showLogin'
			}

		} );

		var API = {

			'showLogin' : function () {
				User.Login.Controller.showLogin();
			}

		};

		Vent.on( 'login:show', function () {
			App.navigate( 'login', { 'trigger' : true } );
		} );

		// set handler when requesting if session is authenticated
		App.reqres.setHandler( 'session:authenticated', function () {
			return Session.authenticated();
		} );

		App.addInitializer( function () {
			new User.Router( {
				'controller' : API
			} );
		} );

	};

} );
