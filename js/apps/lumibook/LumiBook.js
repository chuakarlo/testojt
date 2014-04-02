define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var App        = require( 'App' );

	App.module( 'LumiBook', function ( LumiBook ) {

		// load sub apps
		require( 'lumibook/controllers/showController' );

		LumiBook.Router = Marionette.MiddlewareRouter.extend( {

			'appRoutes' : {
				'lumibook' : [ 'checkSession', 'showLumiBook' ]
			}

		} );

		var API = {

			'checkSession' : function ( args, callback ) {
				App.request( 'session:checkSession', args, callback );
			},

			'showLumiBook' : function ( error, results, args ) {
				// TODO: error handling
				if ( !error ) {
					LumiBook.Show.Controller.showLumiBook();
				}
			}

		};

		App.addInitializer( function () {
			new LumiBook.Router( {
				'controller' : API
			} );
		} );

	} );

} );
