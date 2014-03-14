define( function ( require ) {
	'use strict';

	var CommunitiesShow = require( './controllers/showController' );
	var Marionette      = require( 'marionette' );

	// ## Communities App
	return function ( Communities, App ) {

		// load communities show module
		App.module( 'Communities.Show', CommunitiesShow );

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

	};

} );
