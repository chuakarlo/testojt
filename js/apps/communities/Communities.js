define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var App        = require( 'App' );

	// ## Communities App
	App.module( 'Communities', function ( Communities ) {

		// load communities show module
		require( './controllers/showController' );

		// configure communities routes
		Communities.Router = Marionette.MiddlewareRouter.extend( {

			'appRoutes' : {
				'communities' : [
					'checkSession',
					'showCommunities'
				]
			}

		} );

		var API = {

			// ## Middleware
			'checkSession' : function ( args, callback ) {
				App.request( 'session:checkSession', args, callback );
			},

			'showCommunities' : function ( error, results, args ) {
				// TODO: error handling
				if ( !error ) {
					Communities.Show.Controller.showCommunities();
				}
			}

		};

		App.addInitializer( function () {
			new Communities.Router( {
				'controller' : API
			} );
		} );

	} );

} );
