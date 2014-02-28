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
				'login'  : 'showLogin',
				'logout' : 'showLogout',
				'home'   : 'showHome'
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
			},

			'showLogout' : function () {
				Vent.trigger( 'pd360:hide' );
				Session.destroy();
				User.Login.Controller.showLogin();
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

		App.reqres.setHandler( 'session:username', function () {
			return Session.username();
		} );

		// set handler when requesting if session is authenticated
		App.reqres.setHandler( 'session:checkSession', function ( args, callback ) {

			// Already logged in
			if ( Session.authenticated() === true ) {

				// Pass 'callback' the authenticated user
				callback( null, Session );
			}

			// Not logged in
			else {

				App.navigate( 'login', { 'trigger' : true } );

				return false;

			}

		} );

		App.addInitializer( function () {
			new User.Router( {
				'controller' : API
			} );
		} );

	};

} );
