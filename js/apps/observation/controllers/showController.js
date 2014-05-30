define( function ( require ) {
	'use strict';

	var ObservationView = require( 'observation/views/ObservationView' );
	var App             = require( 'App' );

	App.module( 'Observation.Show', function ( Show ) {

		var navigate = function ( sub ) {
			var pd360Loaded = App.request( 'pd360:loaded' );

			App.content.show( new App.Common.LoadingView() );

			App.when( pd360Loaded ).done( function () {
				App.content.show( new ObservationView() );
				App.request( 'pd360:navigate', 'observation', sub );
			} );
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
