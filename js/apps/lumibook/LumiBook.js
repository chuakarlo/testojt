define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'LumiBook', function ( LumiBook ) {

		var AuthRouter = require( 'AuthRouter' );
		// load sub apps
		require( 'lumibook/controllers/showController' );

		LumiBook.Router = AuthRouter.extend( {

			'appRoutes' : {
				'resources/lumibook' : 'showLumiBook'
			}

		} );

		var API = {

			'showLumiBook' : function() {
				LumiBook.Show.Controller.showLumiBook();
			}

		};

		App.addInitializer( function () {
			new LumiBook.Router( {
				'controller' : API
			} );
		} );

	} );

} );
