define( function ( require ) {
	'use strict';

	var PD360View = require( 'pd360/views/PD360View' );
	var Vent      = require( 'Vent' );
	var App       = require( 'App' );
	var $         = require( 'jquery' );

	App.module( 'PD360.Show', function ( Show, App ) {

		var container   = $( App.flashContent.el );
		var loadedDefer = App.Deferred();

		var loginComplete = false;
		var appLoaded     = false;
		var hasFlash      = true;

		var pendingLogin;
		var pd360;

		Show.Controller = {

			'embed' : function () {

				// callback for pd360 load completion
				window.applicationComplete = function () {
					Vent.trigger( 'pd360:applicationComplete' );
				};

				// callback for pd360 login completion
				window.loginComplete = function () {
					Vent.trigger( 'pd360:loginComplete' );
				};

				// remove listener and global method once event is triggered
				Vent.once( 'pd360:applicationComplete', function () {
					window.applicationComplete = undefined;
					this.applicationComplete();
				}.bind( this ) );

				// remove listener and global method once event is triggered
				Vent.once( 'pd360:loginComplete', function () {
					window.loginComplete = undefined;
					this.loginComplete();
				}.bind( this ) );

				if ( !pd360 ) {
					App.flashContent.show( new PD360View() );

					pd360 = $( '#PD360' )[ 0 ];
				}
			},

			'navigate' : function ( main, sub, options ) {
				sub = sub || '';

				try {
					pd360.navigateFromContainer( main, sub, options );
				} catch ( error ) {}

				// show flash content
				this.show();
			},

			'show' : function () {
				container.removeClass( 'hidden-flash' );
			},

			'hide' : function () {
				container.addClass( 'hidden-flash' );
			},

			'applicationComplete' : function () {
				appLoaded = true;

				if ( pendingLogin ) {
					this.login( pendingLogin.username, pendingLogin.password );
					pendingLogin = null;
				} else if ( App.request( 'session:authenticated' ) ) {
					this.compare();
				}
			},

			'loginComplete' : function () {
				loginComplete = true;

				loadedDefer.resolve( true );
			},

			'login' : function ( username, password ) {
				if ( appLoaded ) {
					pd360.loginFromContainer( username, password );
				} else {
					pendingLogin          = { };
					pendingLogin.username = username;
					pendingLogin.password = password;
				}
			},

			'logout' : function () {
				// attempt to logout, if in the process of logging in,
				// the method won't be available and will throw an error
				try {
					pd360.logoutFromContainer();
				} catch ( error ) {}

				App.flashContent.close();

				pd360         = null;
				appLoaded     = false;
				loginComplete = false;
			},

			'compare' : function () {
				var username = App.request( 'session:username' );

				setTimeout( function () {
					var valid = pd360.compareUserWithSharedObject( username );

					if ( valid ) {
						this.loginShared();
					} else if ( username && !valid ) {
						// user has cookie but no pd360 creds
						Vent.trigger( 'login:show' );
					}

				}.bind( this ), 0 );
			},

			'loginShared' : function () {
				pd360.loginFromContainerWithSharedObject();
			},

			'embedComplete' : function ( success ) {
				if ( !success ) {
					this.noFlash();
				}
			},

			'noFlash' : function () {
				hasFlash     = false;
				pendingLogin = null;
			},

			'available' : function () {

				if ( appLoaded ) {
					try {
						this.signature( 'a', { 'b' : 'c' } );
					} catch ( error ) {
						return false;
					}

					return true;
				}

				return false;
			},

			'signature' : function ( method, args ) {
				return pd360.cfJsonAPIMethod1( method, args );
			},

			'loaded' : function () {
				var state = loadedDefer.state();

				if ( state === 'resolved' || state === 'rejected' ) {
					loadedDefer = $.Deferred();
				}

				if ( !hasFlash || appLoaded && loginComplete ) {
					return loadedDefer.resolve();
				}

				return loadedDefer.promise();
			}

		};

	} );

} );
