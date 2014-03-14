define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Show       = require( './controllers/showController' );

	return function ( LumiBook, App ) {

		// load sub apps
		App.module( 'LumiBook.Show', Show );

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

	};

} );
