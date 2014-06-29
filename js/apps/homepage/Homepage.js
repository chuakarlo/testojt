define( function ( require ) {
	'use strict';

	return function () {

		var App        = require( 'App' );
		var AuthRouter = require( 'AuthRouter' );

		// ## Homepage App
		App.module( 'Homepage', function ( Homepage, App ) {

			require( './utils/homepageRoute' );
			// load utils
			require( './utils/utils' );
			// load widgets
			require( './external/widgets/manifest' );
			// load homepage
			require( './controllers/homeController' );
			// load listeners
			require( './external/content3/agents/Listener' );
			// load content
			require( './external/content3/manifest' );

			// configure groups routes
			Homepage.Router = AuthRouter.extend( {
				'appRoutes' : {
					'home' : 'showHomepage'
				}
			} );

			var API = {
				'showHomepage' : function ( error, results, args ) {
					App.request( 'pd360:hide' );
					Homepage.Show.Controller.showHomepage();
				}
			};

			App.addInitializer( function () {
				new Homepage.Router( {
					'controller' : API
				} );
			} );

		} );

	};

} );
