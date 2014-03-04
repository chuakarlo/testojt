define( function ( require ) {
	'use strict';

	var SearchShow = require( './controllers/showController' );
	var Vent       = require( 'Vent' );
	var Marionette = require( 'marionette' );

	// ## Search App
	return function ( Search, App ) {

		// load search
		App.module( 'Search.Show', SearchShow );

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

	};

} );
