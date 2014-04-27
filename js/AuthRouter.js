define( function ( require ) {
	'use strict';

	var App            = require( 'App' );
	var FilteredRouter = require( 'FilteredRouter' );

	var AuthRouter = FilteredRouter.extend( {

		'before' : {
			'^groups' : function () {
				return this.checkAll();
			},

			'^resources' : function () {
				return this.checkAll();
			},

			'^settings' : function () {
				return this.checkAll();
			},

			'^home' : function () {
				return this.checkAll();
			},

			'^eula' : function () {
				return this.authCheck();
			}
		},

		'checkAll' : function () {
			return this.authCheck() && this.eulaCheck();
		},

		'authCheck' : function () {

			if ( !App.request( 'session:checkSession' ) ) {
				App.navigate( 'login', { 'trigger' : true } );

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
		}

	} );

	return AuthRouter;
} );
