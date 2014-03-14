define( function ( require ) {
	'use strict';

	var PD360View = require( 'pd360/views/PD360View' );
	var Vent      = require( 'Vent' );
	var $         = require( 'jquery' );

	return function ( Show, App ) {

		var container = $( App.flashContent.el );

		var loginComplete = false;
		var appLoaded     = false;

		var pendingNavigation;
		var pendingLogin;

		var RequestedView;
		var pd360;

		Show.Controller = {

			'embed' : function () {
				if ( !pd360 ) {
					App.flashContent.show( new PD360View() );

					pd360 = $( '#PD360' )[ 0 ];
				}
			},

			// accepts a requested view to show within the `content` section,
			// a main app to navigate to in pd360, an optional sub view
			// and any options as a hash. ex: { 'forumId' : 1 }
			'navigate' : function ( View, main, sub, options ) {
				sub = sub || '';

				if ( appLoaded && loginComplete ) {
					pd360.navigateFromContainer( main, sub, options );

					// if a view will be shown above flash content
					if ( View ) {
						App.content.show( new View() );
					} else {
						App.content.close();
					}

					// show flash content
					this.show();
				} else {
					// ensure pd360 remains hidden
					this.hide();

					// store the page to navigate to when loading/login completes
					pendingNavigation         = {};
					pendingNavigation.main    = main;
					pendingNavigation.sub     = sub;
					pendingNavigation.options = options;

					// store the requested view and show a loading view while PD360 loads
					RequestedView = View;
					App.content.show( new App.Common.LoadingView() );
				}

			},

			'show' : function () {
				if ( !pendingNavigation ) {
					container.removeClass( 'hidden-flash' );
				}
			},

			'hide' : function () {
				container.addClass( 'hidden-flash' );
			},

			'applicationComplete' : function () {
				appLoaded = true;

				if ( pendingLogin ) {
					this.login( pendingLogin.username, pendingLogin.password );
					pendingLogin = null;
				} else if ( App.request( 'session:authenticated' ) ){
					this.compare();
				}
			},

			'loginComplete' : function () {
				loginComplete = true;

				if ( pendingNavigation ) {
					var view    = RequestedView;
					var main    = pendingNavigation.main;
					var sub     = pendingNavigation.sub;
					var options = pendingNavigation.options;

					// clear pending
					RequestedView     = null;
					pendingNavigation = null;

					// navigate to pending page
					this.navigate( view, main, sub, options );
				}
			},

			'login' : function ( username, password ) {
				if ( appLoaded ) {
					pd360.loginFromContainer( username, password );
				} else {
					pendingLogin          = {};
					pendingLogin.username = username;
					pendingLogin.password = password;
				}
			},

			'logout' : function () {
				if ( pd360 ) {
					pd360.logoutFromContainer();
					pd360 = null;
				}
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
					}

					// user has cookie but no pd360 creds
					else if ( username && !valid ) {
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
				pendingNavigation = null;
				pendingLogin      = null;

				// close loading
				App.content.close();

				// show flash player install
				this.show();

			},

			'available' : function () {
				return appLoaded;
			},

			'signature' : function ( method, args ) {
				return pd360.cfJsonAPIMethod1( method, args );
			}

		};

	};

} );
