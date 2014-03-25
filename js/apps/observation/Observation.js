define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );

	App.module( 'Observation', function ( Observation ) {

		// load observation sub apps
		require( './controllers/showController' );

		// configure routes
		Observation.Router = Marionette.AppRouter.extend( {

			'appRoutes' : {
				'observation/me' : 'showObservationsOfMe',
				'processes/me'   : 'showProcessesOfMe'
			}

		} );

		// router API
		var API = {

			'showObservationsOfMe' : function () {
				if ( App.request( 'session:authenticated' ) ) {
					Observation.Show.Controller.showObservationsOfMe();
				} else {
					Vent.trigger( 'login:show', 'observation/me' );
				}
			},

			'showProcessesOfMe' : function () {
				if ( App.request( 'session:authenticated' ) ) {
					Observation.Show.Controller.showProcessesOfMe();
				} else {
					Vent.trigger( 'login:show', 'processes/me' );
				}
			}

		};

		App.addInitializer( function () {
			new Observation.Router( {
				'controller' : API
			} );
		} );

	} );

} );
