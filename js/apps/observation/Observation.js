define( function ( require ) {
	'use strict';

	return function () {

		var App = require( 'App' );

		App.module( 'Observation', function ( Observation ) {

			var AuthRouter = require( 'AuthRouter' );
			// load observation sub apps
			require( 'observation/controllers/showController' );

			// configure routes
			Observation.Router = AuthRouter.extend( {

				'appRoutes' : {
					'resources/observation/me' : 'showObservationsOfMe',
					'resources/processes/me'   : 'showProcessesOfMe'
				}

			} );

			// router API
			var API = {

				'showObservationsOfMe' : function () {
					Observation.Show.Controller.showObservationsOfMe();
				},

				'showProcessesOfMe' : function () {
					Observation.Show.Controller.showProcessesOfMe();
				}

			};

			App.addInitializer( function () {
				new Observation.Router( {
					'controller' : API
				} );
			} );

		} );
	};

} );
