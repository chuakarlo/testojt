define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );

	// ## Search App
	App.module( 'Search', function ( Search ) {

		// load search
		require( './controllers/showController' );

		// configure search routes
		Search.Router = Marionette.AppRouter.extend( {

			'appRoutes' : {
				'search' : 'showSearchResults'
			}

		} );

		var API = {

			'showSearchResults' : function () {
				App.PD360.hide();
				Search.Show.Controller.showSearchResults();
			}

		};

		Vent.on( 'search:showSearchResults', function () {
			App.navigate( 'search', { 'trigger' : true } );
		} );

		App.addInitializer( function () {
			new Search.Router( {
				'controller' : API
			} );
		} );

	} );

} );
