define( function ( require ) {
	'use strict';

	var App            = require( 'App' );
	var FilteredRouter = require( 'FilteredRouter' );

	var AuthRouter = FilteredRouter.extend( {

		'before' : {
			'^groups' : function() {
				return this.authCheck();
			},

			'^resources' : function() {
				return this.authCheck();
			},

			'^settings' : function() {
				return this.authCheck();
			},

			'^home' : function() {
				return this.authCheck();
			}
		},

		'authCheck' : function() {
			if ( !App.request( 'session:checkSession' ) ) {
				App.navigate( 'login', { 'trigger' : true } );

				return false;
			}

			return true;
		}
	} );

	return AuthRouter;
} );