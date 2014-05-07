define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var Vent     = require( 'Vent' );
	var App      = require( 'App' );

	require( 'jquery-cookie' );

	var usernameCookie   = 'UID';
	var personnelCookie  = 'PID';
	var eulaCookie       = 'EULA';
	var cfCookie         = 'CFAUTHORIZATION_PD360';
	var useWizardsCookie = 'USEWIZARDS';
	var cookieOptions    = { 'path' : '/' };

	var Session = Backbone.Model.extend( {

		// `username` & `password` to login
		// does not pass the username and password in the ajax call
		'fetch' : function ( options ) {

			var done = options.success;

			options.success = function ( jqXHR, status, error ) {

				// SSO returns array, Login returns object
				if ( _.isArray(jqXHR) ) {
					jqXHR = jqXHR[ 0 ];
				}

				// Redirect to login if SSO error occurred
				if ( jqXHR.ErrorId ) {
					App.request( 'login:error', jqXHR );
					return;
				}

				this.setCookie( useWizardsCookie, jqXHR.UseWizards );

				if ( jqXHR.PersonnelId ) {
					// Set the cookies before we trigger success
					if ( this.username ) {
						this.setCookie( usernameCookie, this.username );
					}

					this.setCookie( personnelCookie, jqXHR.PersonnelId );
					this.setCookie( eulaCookie, jqXHR.LicenseAccepted );

					Vent.trigger( 'login:success' );
					Vent.trigger( 'session:change' );
					App.request( 'pd360:login', this.username, this.password );

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

			if ( options.username && options.password ) {
				this.username = options.username;
				this.password = options.password;

				// remove username and password so that jQuery doesn't make the URL http://user:pass@domain.com
				delete options.username;
				delete options.password;

				this.fetch( options );
			}

		},

		'sso' : function ( options ) {
			// force json return
			options.returnformat = 'json';

			// set defaults
			this.username  = options.loginName;
			this.ssoParams = $.param( options );

			// update url for SSO
			this.url = function () {
				return '/com/schoolimprovement/pd360/dao/SessionService.cfc?method=authenticateSingleSignOnUser&' + this.ssoParams;
			};

			this.fetch( { } );
		},

		// extra logout steps
		// removes persistence
		'destroy' : function ( options ) {

			// remove Coldfusion cookies
			this.removeCookie( cfCookie );
			this.removeCookie( 'CFID' );
			this.removeCookie( 'CFTOKEN' );
			this.removeCookie( useWizardsCookie );

			// remove personnelId & username
			if ( !$.cookie( 'remember' ) ) {
				this.removeCookie( usernameCookie );
			}
			this.removeCookie( personnelCookie );
			this.removeCookie( eulaCookie );

			// Log out of flash
			Vent.trigger( 'pd360:logout' );

			// trigger session change for menus, etc
			Vent.trigger( 'session:destroy' );

		},

		// check to see if the user is logged in
		'authenticated' : function () {
			var cookies = [
				'CFID',
				'CFTOKEN',
				cfCookie,
				usernameCookie,
				personnelCookie
			];
			// IE9 + supports array.every but why not use underscore
			return _.every( cookies, function ( cookie ) {
				return Boolean( $.cookie( cookie ) );
			} ) ;
		},

		'eulaAccepted' : function () {
			return $.cookie( eulaCookie );
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
		}

	} );

	return new Session();
} );
