define( function ( require ) {
	'use strict';

	var Backbone       = require( 'backbone' );

	var App            = require( 'App' );
	var Vent           = require( 'Vent' );
	var FilteredRouter = require( 'FilteredRouter' );

	var AuthRouter = FilteredRouter.extend( {

		'before' : {

			'^admin' : function () {
				return this.authCheck();
			},

			// EULA check redirects to this route
			'^eula' : function () {
				return this.authCheck();
			},

			'^groups' : function () {
				return this.checkAll();
			},

			'^messages' : function () {
				return this.checkAll();
			},

			'^home' : function () {
				return this.checkAll();
			},

			'^resources' : function () {
				return this.checkAll();
			},

			'^search' : function () {
				return this.checkAll();
			},

			// Password check redirects to a route here
			'^settings' : function () {
				return this.authCheck() && this.eulaCheck();
			},

			'^logout' : function () {
				return this.authCheck( 'logout' );
			}

		},

		'checkAll' : function () {
			return this.authCheck() && this.eulaCheck() && this.passwordCheck();
		},

		'authCheck' : function ( route ) {

			if ( !App.request( 'session:checkSession' ) ) {
				if ( route === 'logout' ) {
					Vent.trigger( 'login:show' );
				} else {
					Vent.trigger( 'login:show', Backbone.history.fragment );
				}
				return false;
			}

			return true;
		},

		'eulaCheck' : function () {

			if ( !App.request( 'session:eulaAccepted' ) ) {
				App.navigate( 'eula', { 'trigger' : true } );

				return false;
			}

			return true;
		},

		'passwordCheck' : function () {

			var PasswordReset = App.request( 'session:personnel', 'PasswordReset' );
			var RoleTypeId    = App.request( 'session:personnel', 'RoleTypeId' );

			if ( PasswordReset === 0 && RoleTypeId !== 4 ) {

				App.navigate( 'settings/profile', { 'trigger' : true } );

				App.errorHandler( { 'message' : 'Before proceeding, you must change your password.' } );

				return false;
			}
			return true;

		}

	} );

	return AuthRouter;
} );
