define( function ( require ) {
	'use strict';

	var ObservationView = require( '../views/ObservationView' );
	var Vent            = require( 'Vent' );

	return function ( Show, App ) {

		var navigate = function ( sub ) {
			Vent.trigger( 'pd360:navigate', 'observation', sub );
			Vent.trigger( 'pd360:show' );
		};

		Show.Controller = {

			'showObservationsOfMe' : function () {
				navigate( 'observationOfMe' );
				App.content.show( new ObservationView() );
			},

			'showProcessesOfMe' : function () {
				navigate( 'observationProcessesOfMe' );
				App.content.show( new ObservationView() );
			}

		};
	};
	
} );
