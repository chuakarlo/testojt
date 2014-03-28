define( function ( require ) {
	'use strict';

	var App               = require( 'App' );
	var ContentController = require( './main' );
	var AuthRouter        = require( 'AuthRouter');

	App.module( 'ContentNavigation', function ( ContentNavigation ) {

		// load sub apps
		// require( './controllers/showController' );

		ContentNavigation.Router = AuthRouter.extend( {
			'appRoutes' : {
				'resources/videos' : 'showContentNavigation'
			}
		} );

		var API = {
			// TODO: error handling
			'showContentNavigation' : function ( args ) {
				var contentNavigation = new ContentController( { 'init' : true } );
				App.content.show( contentNavigation.MainView );
			}
		};

		App.addInitializer( function () {
			new ContentNavigation.Router( {
				'controller' : API
			} );
		} );

	} );

} );