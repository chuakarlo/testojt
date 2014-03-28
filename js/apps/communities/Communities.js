define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var AuthRouter = require( 'AuthRouter' );

	// ## Communities App
	App.module( 'Communities', function ( Communities ) {

		// load communities show module
		require( './controllers/showController' );

		// configure communities routes
		Communities.Router = AuthRouter.extend( {

			'appRoutes' : {
				'resources/communities' : 'showCommunities'
			}

		} );

		var API = {
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
