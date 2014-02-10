define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var Cookie   = require( 'jquery-cookie' );

	var Session = Backbone.Model.extend( {

		url : function () {
			return '/pd360/dao/RespondService.cfc?method=rspndLogin&loginNm=' + this.username + '&passwrd=' + this.password + '&returnformat=json';
		},

		// `username` & `password` to login
		// does not pass the username and password in the ajax call
		'fetch' : function ( options ) {
			var model = this;

			// credentials provided
			if ( ( options.username && options.password ) ) {

				this.username = options.username;
				this.password = options.password;

				// remove username and password so that jQuery doesn't make the URL http://user:pass@domain.com
				delete options.username;
				delete options.password;

				return this.sync( 'read', this, options );

			// else no credentials provided, TODO: Error handling
			}
		},

		// check to see if the user is logged in
		'authenticated' : function () {
			return Boolean( $.cookie( 'CFAUTHORIZATION_PD360' ) );
		}

	} );

	return new Session();
} );