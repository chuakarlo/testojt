define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Show       = require( './controllers/showController' );
	var Vent       = require( 'Vent' );

	return function ( Observation, App ) {

		// load observation sub apps
		App.module( 'Observation.Show', Show );

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

	};

} );
