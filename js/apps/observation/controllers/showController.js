define( function ( require ) {
	'use strict';

	var ObservationView = require( 'observation/views/ObservationView' );

	return function ( Show, App ) {

		var navigate = function ( sub ) {
			App.PD360.navigate( ObservationView, 'observation', sub );
		};

		Show.Controller = {

			'showObservationsOfMe' : function () {
				navigate( 'observationOfMe' );
			},

			'showProcessesOfMe' : function () {
				navigate( 'observationProcessesOfMe' );
			}

		};
	};
	
} );
