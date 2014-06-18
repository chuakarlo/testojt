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

			'^settings' : function () {
				return this.checkAll();
			}

		},

		'checkAll' : function () {
			return this.authCheck() && this.eulaCheck();
		},

		'authCheck' : function () {

			if ( !App.request( 'session:checkSession' ) ) {
				Vent.trigger( 'login:show', Backbone.history.fragment );
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
