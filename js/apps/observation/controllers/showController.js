define( function ( require ) {
	'use strict';

	var ObservationView = require( 'observation/views/ObservationView' );
	var App             = require( 'App' );

	App.module( 'Observation.Show', function ( Show ) {

		var navigate = function ( sub ) {
			App.request( 'pd360:navigate', ObservationView, 'observation', sub );
		};

		Show.Controller = {

			'showObservationsOfMe' : function () {
				navigate( 'observationOfMe' );
			},

			'showProcessesOfMe' : function () {
				navigate( 'observationProcessesOfMe' );
			}

		};
	} );
	
} );
