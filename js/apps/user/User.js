define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );

	var Login   = require( './controllers/loginController' );
	var Home    = require( './controllers/homeController' );
	var Session = require( 'Session' );

	return function ( User, App ) {

		// load sub apps
		App.module( 'User.Login', Login );
		App.module( 'User.Home', Home );

		// configure routes
		User.Router = Marionette.AppRouter.extend( {

			'appRoutes' : {
				'login' : 'showLogin',
				'home'  : 'showHome'
			}

		} );

		var API = {

			'showLogin' : function () {
				Vent.trigger( 'pd360:hide' );
				User.Login.Controller.showLogin();
			},

			'showHome' : function () {
				Vent.trigger( 'pd360:hide' );
				User.Home.Controller.showHome();
			}

		};

		// the route requested before login was triggered
		var requestedRoute;

		Vent.on( 'login:show', function ( requested ) {
			requestedRoute = requested;
			App.navigate( 'login', { 'trigger' : true } );
		} );

		Vent.on( 'login:success', function () {
			// if there was a requested route before login
			if ( requestedRoute ) {
				App.navigate( requestedRoute, { 'trigger' : true } );
				requestedRoute = null;
			} else {
				App.navigate( 'home', { 'trigger' : true } );
			}
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
