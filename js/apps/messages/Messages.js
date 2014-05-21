define( function ( require ) {
	'use strict';

	var App        = require ( 'App' );
	var AuthRouter = require ( 'AuthRouter' );

	require ( 'apps/messages/controllers/mainController' );
	require ( 'apps/messages/entities/Messages' );

	App.module( 'Messages', function ( Messages, App ) {

		// configure routes
		Messages.Router = AuthRouter.extend ( {

			'appRoutes' : {
				'messages' : 'showMessages'
			}
		} );

		App.addInitializer ( function () {

			new Messages.Router( {
				'controller' : Messages.Main.controller
			} );

		} );

	} );
} );
