define( function ( require ) {
	'use strict';

	var Session    = require( 'Session' );
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );
	var AuthRouter = require( 'AuthRouter' );
	var Marionette = require( 'marionette' );

	require( 'user/controllers/loginController' );
	require( 'user/controllers/settingsController' );
	require( 'user/controllers/registerController' );
	require( 'user/entities/License' );
	require( 'user/entities/Profile' );
	require( 'user/entities/Personnel' );

	App.module( 'User', function ( User, App ) {

		// configure routes
		User.Router = AuthRouter.extend( {

			'appRoutes' : {
				'login'            : 'showLogin',
				'logout'           : 'showLogout',
				'register'         : 'showRegister',
				'settings(/:page)' : 'showSettings'
			}

		} );

		var UserController = Marionette.Controller.extend( {

			'showLogin' : function () {
				App.request( 'pd360:hide' );

				if ( App.request( 'session:authenticated' ) ) {
					return App.navigate( 'home', { 'trigger' : true } );
				}

				User.Login.Controller.showLogin();
			},

			'showRegister' : function () {
				App.request( 'pd360:hide' );

				User.Register.Controller.showRegister();
			},

			'showLogout' : function () {
				this.listenTo( App.flashContent, 'close', function () {
					Session.destroy();
					App.navigate( 'login', { 'trigger' : true } );
				} );

				App.request( 'pd360:hide' );
				App.request( 'user:licenses:reset' );
				App.request( 'pd360:logout' );
			},

			'showSettings' : function (page) {
				App.request( 'pd360:hide' );
				User.Settings.Controller.showSettings(page);
			},

		} );

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
			if ( !Session.authenticated() ) {
				return false;
			}
			return true;
		} );

		App.addInitializer( function () {
			new User.Router( {
				'controller' : new UserController()
			} );
		} );

	} );

} );
