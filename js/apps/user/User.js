define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Session    = require( 'Session' );
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );
	var AuthRouter = require( 'AuthRouter' );
	var Marionette = require( 'marionette' );

	require( 'user/controllers/loginController' );
	require( 'user/controllers/settingsController' );
	require( 'user/controllers/registerController' );
	require( 'user/controllers/eulaController' );
	require( 'user/entities/License' );
	require( 'user/entities/Profile' );
	require( 'user/entities/Personnel' );
	require( 'user/entities/Privilege' );
	require( 'user/entities/GradeLevels' );
	require( 'user/entities/Roles' );
	require( 'user/entities/Subjects' );
	require( 'user/entities/Nav' );

	var SettingsLayout = require( 'user/views/settings/SettingsLayout' );

	App.module( 'User', function ( User, App ) {

		// configure routes
		User.Router = AuthRouter.extend( {

			'appRoutes' : {
				'eula'             : 'showEula',
				'login'            : 'showLogin',
				'logout'           : 'showLogout',
				'register'         : 'showRegister',
				'settings(/:page)' : 'showSettings',
				'sso(/:params)'    : 'ssoSignIn'
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

			'showEula' : function () {
				App.request( 'pd360:hide' );

				User.Eula.Controller.showEula();
			},

			'showLogout' : function () {

				this.listenTo( App.flashContent, 'close', function () {
					Session.destroy();

					var currentLocation = window.location.origin;

					// this is to reload the application
					window.location.assign( currentLocation );
				} );

				App.request( 'pd360:hide' );
				App.request( 'user:licenses:reset' );
				App.request( 'pd360:logout' );

			},

			'showSettings' : function ( page ) {
				App.request( 'pd360:hide' );

				if ( !this.layout ) {
					this.layout = new SettingsLayout();
					App.content.show( this.layout );
					this.listenTo( this.layout, 'close', this.destroyControllers );
				}

				if ( !this.contentController ) {
					this.contentController = new User.Settings.ContentController( {
						'layout' : this.layout
					} );
				}

				if ( !this.navController ) {
					this.navController = new User.Settings.NavController( {
						'layout' : this.layout
					} );
				}

				this.navController.setPage( page );
				this.contentController.showPage( page );
			},

			'ssoSignIn' : function ( params ) {

				var options = { };
				var groups  = params.split( '&' );

				_.each( groups, function ( value ) {
					var group = value.split( '=' );

					options[ group[ 0 ] ] = group[ 1 ];
				} );

				Session.sso( options );

			},

			'destroyControllers' : function () {
				this.navController     = null;
				this.contentController = null;
				this.layout            = null;
			}

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

		// set handler when requesting if EULA is accepted
		App.reqres.setHandler( 'session:eulaAccepted', function () {
			return Session.eulaAccepted();
		} );

		// set handler when requesting if session is authenticated
		App.reqres.setHandler( 'session:checkSession', function () {
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
