define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var Session    = require( 'Session' );
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );
	var AuthRouter = require( 'AuthRouter' );
	var Marionette = require( 'marionette' );

	require( 'user/controllers/loginController' );
	require( 'user/controllers/settingsController' );
	require( 'user/controllers/registerController' );
	require( 'user/controllers/eulaController' );
	require( 'user/controllers/privacyController' );
	require( 'user/controllers/forgotPasswordController' );
	require( 'user/controllers/successController' );
	require( 'user/entities/License' );
	require( 'user/entities/Profile' );
	require( 'user/entities/Personnel' );
	require( 'user/entities/Privilege' );
	require( 'user/entities/GradeLevels' );
	require( 'user/entities/Roles' );
	require( 'user/entities/Subjects' );
	require( 'user/entities/Nav' );
	require( 'user/entities/Observation' );
	require( 'user/entities/SendPassword' );

	require( 'apps/applications' );
	require( 'user/SessionHelper' );

	if ( App.request( 'session:authenticated' ) && App.request( 'session:personnel' ) === false ) {
		// show a loading view while we wait
		App.content.show( new App.Common.LoadingView() );
		App.request( 'session:refresh' );
	}

	var SettingsLayout = require( 'user/views/settings/SettingsLayout' );

	App.module( 'User', function ( User, App ) {

		// configure routes
		User.Router = AuthRouter.extend( {

			'appRoutes' : {
				'eula'             : 'showEula',
				'eula-full'        : 'showEulaText',
				'privacy'          : 'showPrivacy',
				'login'            : 'showLogin',
				'logout'           : 'showLogout',
				'register'         : 'showRegister',
				'settings(/:page)' : 'showSettings',
				'sso(/:params)'    : 'ssoSignIn',
				'forgotPassword'   : 'showForgotPassword',
				'success'          : 'showSucces'
			}

		} );

		var UserController = Marionette.Controller.extend( {

			'showLogin' : function () {
				App.request( 'pd360:hide' );

				if ( App.request( 'session:authenticated' ) ) {
					return App.navigate( 'home', { 'trigger' : true, 'replace' : true } );
				}

				User.Login.Controller.showLogin();
			},

			'showRegister' : function () {
				App.request( 'pd360:hide' );

				if ( App.request( 'session:authenticated' ) ) {
					return App.navigate( 'home', { 'trigger' : true, 'replace' : true } );
				}

				User.Register.Controller.showRegister();
			},

			'showForgotPassword' : function () {
				App.request( 'pd360:hide' );

				User.ForgotPassword.Controller.showForgotPassword();
			},

			'showEula' : function () {
				App.request( 'pd360:hide' );

				if ( App.request( 'session:eulaAccepted' ) ) {
					return App.navigate( 'eula-full', { 'trigger' : true } );
				}

				User.Eula.Controller.showEula();
			},

			'showEulaText' : function () {
				App.request( 'pd360:hide' );

				User.Eula.Controller.showEulaText();
			},

			'showPrivacy' : function () {
				App.request( 'pd360:hide' );

				User.Privacy.Controller.showPrivacy();
			},

			'showLogout' : function () {

				this.listenTo( App.flashContent, 'close', function () {
					Session.destroy();

					// IE does not have window.location.origin
					if ( !window.location.origin ) {
						window.location.origin = window.location.protocol + '//' + window.location.hostname + ( window.location.port ? ':' + window.location.port: '' );
					}

					// replace the logout with home in the history, so the back button doesn't log you out
					App.navigate( 'home', { 'trigger' : false, 'replace' : true } );

					var currentLocation = window.location.origin + window.location.pathname;

					// this is to reload the application
					window.location.assign( currentLocation );
				} );

				App.request( 'pd360:hide' );
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
			},

			'showSucces' : function () {
				User.Success.Controller.showSuccess();
			}

		} );

		// the route requested before login was triggered
		var requestedRoute;

		Vent.on( 'login:show', function ( requested ) {
			requestedRoute = requested;
			App.navigate( 'login', { 'trigger' : true, 'replace' : true } );
		} );

		Vent.on( 'login:success', function ( forceRoute ) {
			// if there was a requested route before login defaults to home if none.
			forceRoute = forceRoute || requestedRoute || 'home';

			App.navigate( forceRoute, { 'trigger' : true, 'replace' : true } );
			requestedRoute = null;

		} );

		App.vent.on( 'sendpassword:success', function () {
			App.navigate( 'success', { 'trigger' : true } );
		} );

		App.reqres.setHandler( 'session:username', function () {
			return Session.username();
		} );

		// set handler when requesting if EULA is accepted
		App.reqres.setHandler( 'session:eulaAccepted', function () {
			return $.cookie( App.request( 'session:cookies', 'eula' ) );
		} );

		// set handler when requesting if session is authenticated
		App.reqres.setHandler( 'session:checkSession', function () {
			if ( !App.request( 'session:authenticated' ) ) {
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
