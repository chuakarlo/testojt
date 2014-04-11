define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var Vent     = require( 'Vent' );
	var App      = require( 'App' );

	require( 'jquery-cookie' );

	var usernameCookie  = 'UID';
	var personnelCookie = 'PID';
	var cfCookie        = 'CFAUTHORIZATION_PD360';
	var cookieOptions   = { 'path' : '/' };

	var Session = Backbone.Model.extend( {

		'url' : function () {
			return '/com/schoolimprovement/pd360/dao/RespondService.cfc?method=rspndLogin&loginNm=' + this.username + '&passwrd=' + this.password + '&returnformat=json';
		},

		// `username` & `password` to login
		// does not pass the username and password in the ajax call
		'fetch' : function ( options ) {
			// credentials provided
			if ( ( options.username && options.password ) ) {

				this.username = options.username;
				this.password = options.password;

				var done = options.success;

				options.success = function ( jqXHR, status, error ) {

					// Set the cookies before we trigger success
					this.setCookie( usernameCookie, this.username );
					this.setCookie( personnelCookie, jqXHR[ 0 ].PersonnelId );

					Vent.trigger( 'login:success' );
					Vent.trigger( 'session:change' );
					App.request( 'pd360:login', this.username, this.password );

					if ( done ) {
						done( jqXHR, status, error );
					}
				}.bind( this );

				// remove username and password so that jQuery doesn't make the URL http://user:pass@domain.com
				delete options.username;
				delete options.password;

				return this.sync( 'read', this, options );

			// else no credentials provided, TODO: Error handling
			}
		},

		// extra logout steps
		// removes persistence
		'destroy' : function ( options ) {

			// remove Coldfusion cookies
			this.removeCookie( cfCookie );
			this.removeCookie( 'CFID' );
			this.removeCookie( 'CFTOKEN' );

			// remove personnelId & username
			if( !$.cookie( 'remember' ) ) {
				this.removeCookie( usernameCookie );
			}
			this.removeCookie( personnelCookie );

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
			return _.every( cookies, function( cookie ) {
				return Boolean( $.cookie( cookie ) );
			} ) ;
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
