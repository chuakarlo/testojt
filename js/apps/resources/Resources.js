define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'Resources', function ( Resources ) {

		var AuthRouter = require( 'AuthRouter' );

		require( 'resources/controllers/listController' );

		Resources.Router = AuthRouter.extend( {

			'appRoutes' : {
				'resources/more' : 'listResources'
			}

		} );

		var API = {

			'listResources' : function() {
				App.request( 'pd360:hide' );
				Resources.List.Controller.listResources();
			}

		};

		App.addInitializer( function () {
			new Resources.Router( {
				'controller' : API
			} );
		} );

	} );

} );
