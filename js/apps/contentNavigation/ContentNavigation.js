define( function ( require ) {
	'use strict';

	var Marionette        = require( 'marionette' );
	var App               = require( 'App' );
	var ContentNavigation = require( './main' );
	var contentNavigation = new ContentNavigation( { 'init' : true } );

	App.module( 'ContentNavigation', function ( ContentNavigation ) {

		// load sub apps
		// require( './controllers/showController' );

		ContentNavigation.Router = Marionette.MiddlewareRouter.extend( {
			'appRoutes' : {
				'resources/videos' : [ 'checkSession', 'showContentNavigation' ]
			}
		} );

		var API = {
			'checkSession' : function ( args, callback ) {
				App.request( 'session:checkSession', args, callback );
			},

			// TODO: error handling
			'showContentNavigation' : function ( error, results, args ) {
				if ( !error ) {
					App.content.show( contentNavigation.MainView );
					// ContentNavigation.Show.Controller.showContentNavigation();
				}
			}
		};

		App.addInitializer( function () {
			new ContentNavigation.Router( {
				'controller' : API
			} );
		} );

	} );

} );