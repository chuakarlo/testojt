define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var AuthRouter = require( 'AuthRouter' );

	// ## Homepage App
	App.module( 'Homepage', function ( Homepage, App ) {

		// load homepage
		require( './controllers/homeController' );

		// configure groups routes
		Homepage.Router = AuthRouter.extend( {
			'appRoutes' : {
				'home' : 'showHomepage'
			}
		} );

		var API = {
			'showHomepage' : function ( error, results, args ) {
				App.PD360.hide();
				Homepage.Show.Controller.showHomepage();
			}
		};

		App.addInitializer( function () {
			new Homepage.Router( {
				'controller' : API
			} );
		} );
	} );
} );
