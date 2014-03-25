define( function ( require ) {
	'use strict';
	
	var App  = require( 'App' );
	var Vent = require( 'Vent' );

	require( './controller/pd360Controller' );

	App.module( 'PD360', function ( PD360, App ) {
		
		var API = {

			'embed' : function () {
				PD360.Show.Controller.embed();
			},

			'navigate' : function ( main, sub, options ) {
				PD360.Show.Controller.navigate( main, sub, options );
			},

			'show' : function () {
				PD360.Show.Controller.show();
			},

			'hide' : function () {
				PD360.Show.Controller.hide();
			},

			'applicationComplete' : function () {
				PD360.Show.Controller.applicationComplete();
			},

			'loginComplete' : function () {
				PD360.Show.Controller.loginComplete();
			},

			'login' : function ( username, password ) {
				PD360.Show.Controller.login( username, password );
			},

			'logout' : function () {
				PD360.Show.Controller.logout();
			},

			'embedComplete' : function ( success ) {
				PD360.Show.Controller.embedComplete( success );
			},

			'available' : function () {
				return PD360.Show.Controller.available();
			},

			'signature' : function ( method, args ) {
				return PD360.Show.Controller.signature( method, args );
			}

		};

		PD360.show = function () {
			API.show();
		};

		PD360.hide = function () {
			API.hide();
		};

		PD360.navigate = function ( View, main, sub, options ) {
			API.navigate( View, main, sub, options );
		};

		PD360.login = function ( username, password ) {
			API.login( username, password );
		};

		PD360.logout = function () {
			API.logout();
		};

		PD360.available = function () {
			return API.available();
		};

		PD360.signature = function ( method, args ) {
			return API.signature( method, args );
		};

		// initialize PD360 swf on creation if authenticated
		PD360.on( 'start', function () {
			if ( App.request( 'session:authenticated' ) ) {
				API.embed();
			}
		} );

		Vent.on( 'login:success', function () {
			API.embed();
		} );

		Vent.on( 'pd360:login', function ( username, password ) {
			API.login( username, password );
		} );

		Vent.on( 'embed:complete', function ( success ) {
			API.embedComplete( success );
		} );

		// callback for pd360 load completion
		window.applicationComplete = function () {
			Vent.trigger( 'pd360:applicationComplete' );
		};

		// remove listener and global method once event is triggered
		Vent.once( 'pd360:applicationComplete', function () {
			window.applicationComplete = undefined;
			API.applicationComplete();
		} );

		// callback for pd360 login completion
		window.loginComplete = function () {
			Vent.trigger( 'pd360:loginComplete' );
		};

		// remove listener and global method once event is triggered
		Vent.once( 'pd360:loginComplete', function () {
			window.loginComplete = undefined;
			API.loginComplete();
		} );

	} );
	
} );
