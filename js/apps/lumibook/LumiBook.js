define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Show       = require( './controllers/showController' );
	var Vent       = require( 'Vent' );

	return function ( LumiBook, App ) {

		// load sub apps
		App.module( 'LumiBook.Show', Show );

		LumiBook.Router = Marionette.AppRouter.extend( {

			'appRoutes' : {
				'lumibook' : 'showLumiBook'
			}

		} );

		var API = {

			'showLumiBook' : function () {
				if ( App.request( 'session:authenticated' ) ) {
					LumiBook.Show.Controller.showLumiBook();
				} else {
					Vent.trigger( 'login:show', 'lumibook' );
				}
			}

		};

		App.addInitializer( function () {
			new LumiBook.Router( {
				'controller' : API
			} );
		} );

	};

} );
