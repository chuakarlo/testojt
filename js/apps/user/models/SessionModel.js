define( function ( require ) {
	'use strict';

	var $         = require( 'jquery' );
	var _         = require( 'underscore' );
	var Backbone  = require( 'backbone' );
	var Vent      = require( 'Vent' );
	var App       = require( 'App' );
	var ssoHelper = require( 'user/SsoHelper' );

	require( 'jquery-cookie' );
	require( 'user/SessionHelper' );

	var cookies = App.request( 'session:cookies' );

	var usernameCookie     = cookies.username;
	var personnelCookie    = cookies.personnel;
	var eulaCookie         = cookies.eula;
	var cfCookie           = cookies.cf;
	var useWizardsCookie   = cookies.useWizards;
	var cookieOptions      = { 'path' : '/' };

	var Session = Backbone.Model.extend( {

		// `username` & `password` to login
		// does not pass the username and password in the ajax call
		'fetch' : function ( options ) {

			var done = options.success;

			options.success = function ( jqXHR, status, error ) {

				// SSO returns array, Login returns object
				if ( _.isArray( jqXHR ) ) {
					jqXHR = { 'personnel' : jqXHR[ 0 ] };
					this.password = jqXHR.personnel.Password;
					this.username = jqXHR.personnel.LoginName;
				}

				// Redirect to login if SSO error occurred
				if ( ( jqXHR.personnel && jqXHR.personnel.ErrorId ) || jqXHR.PersonnelId === 0 ) {

					// Dirty hack for the back end returning an empty personnel object
					jqXHR.personnel             = jqXHR.personnel || { };
					jqXHR.personnel.DisplayText = jqXHR.personnel.DisplayText || 'An error occurred. Please try again later.';

					options.error( jqXHR, status, error );
					return;
				}

				this.setCookie( useWizardsCookie, jqXHR.personnel.UseWizards );

				if ( jqXHR.personnel.PersonnelId ) {
					// Set the cookies before we trigger success
					if ( this.username ) {
						this.setCookie( usernameCookie, this.username );

						// Set remember cookie if it was checked
						if ( options.remember ) {
							var expirationDate = new Date();

							expirationDate.setFullYear( expirationDate.getFullYear() + 1 );
							$.cookie( 'remember', this.username, { 'expires' : expirationDate } );
						}
					}

					// Add the Personnel ID and EULA cookies
					this.setCookie( personnelCookie, jqXHR.personnel.PersonnelId );
					this.setCookie( eulaCookie, jqXHR.personnel.LicenseAccepted );

					this.requestedRoute = null;
					// After the session is initialized trigger the other events
					Vent.on( 'session:initialized', function ssoSessionInitialized () {
						Vent.trigger( 'login:success' );
						Vent.trigger( 'session:change' );
						App.request( 'pd360:login', this.username, this.password );
					}.bind( this ) );

					// Standard Login
					if ( jqXHR.config ) {
						App.request( 'session:initialize', jqXHR );

					// SSO Login
					} else {
						// show a loading view while fetching data
						App.content.show( new App.Common.LoadingView() );

						this.requestedRoute = options.forceRoute || null;
						App.request( 'session:refresh', this.requestedRoute );
					}

					if ( done ) {
						done( jqXHR, status, error );
					}
				}

			}.bind( this );

			return this.sync( 'read', this, options );

		},

		'login' : function ( options ) {
			this.url = function () {
				return '/com/schoolimprovement/pd360/dao/RespondService.cfc?method=rspndLogin&loginNm=' + this.username + '&passwrd=' + this.password + '&returnformat=json';
			};

			// remove old cookies
			this.removeCookie( 'remember' );

			// set variables
			this.username = encodeURIComponent( options.username );
			this.password = encodeURIComponent( options.password );

			// remove username and password so that jQuery doesn't make the URL http://user:pass@domain.com
			delete options.username;
			delete options.password;

			this.fetch( options );

		},

		'sso' : function ( options ) {

			// Determine requested route if one exists
			var forceRoute = this.linkFromParams( options );

			// Default to home if there wasn't a requested route
			forceRoute = forceRoute || 'home';

			// Login with SSO credentials and redirect
			if ( this.isSSO( options ) ) {

				// get defaults and use UPPERCASE key names
				options = this.getSSODefaults( options );

				// set defaults
				var params = $.param( options );

				// update url for SSO
				this.url = function () {
					return '/com/schoolimprovement/pd360/dao/SessionService.cfc?method=authenticateSingleSignOnUser&' + params;
				};

				this.fetch( {
					'forceRoute' : forceRoute,
					'ladda'      : { 'stop' : function () {} },
					'error'      : function ( jqXHR, status, error ) {
						App.errorHandler( new Error( jqXHR.personnel.DisplayText ) );
					}
				} );

			// If not SSO login just navigate to requested route
			} else {
				App.navigate( forceRoute, { 'trigger' : true } );
			}

		},

		// extra logout steps
		// removes persistence
		'destroy' : function ( options ) {

			// Log out of flash
			Vent.trigger( 'pd360:logout' );

			this.deleteCookies();

			// trigger session change for menus, etc
			Vent.trigger( 'session:destroy' );

		},

		'deleteCookies' : function () {

			// remove Coldfusion cookies
			this.removeCookie( cfCookie );
			this.removeCookie( 'CFID' );
			this.removeCookie( 'CFTOKEN' );
			this.removeCookie( useWizardsCookie );
			this.removeCookie( usernameCookie );
			this.removeCookie( personnelCookie );
			this.removeCookie( eulaCookie );
			this.removeCookie( cookies.eulaInitials );

		},

		'useWizards' : function () {
			return $.cookie( useWizardsCookie ) === '1';
		},

		'username' : function () {
			return $.cookie( usernameCookie );
		},

		'token' : function () {
			return $.cookie( 'CFTOKEN' );
		},

		'personnelId' : function () {
			return $.cookie( personnelCookie ) || null;
		},

		// sets a cookie, defaults to path of `/`
		'setCookie' : function ( name, value, options ) {
			options = options || cookieOptions;
			$.cookie( name, value, options );
		},

		// remove a cookie, defaults to path of `/`
		'removeCookie' : function ( name, options ) {
			options = options || cookieOptions;
			$.removeCookie( name, options );
		},

		'getSSODefaults' : ssoHelper.getSSODefaults,
		'isSSO'          : ssoHelper.isSSO,
		'linkFromParams' : ssoHelper.linkFromParams

	} );

	return new Session();
} );
