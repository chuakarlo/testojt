define( function ( require ) {
	'use strict';

	var Vent = require( 'Vent' );
	var App = require( 'App' );

	App.module( 'Header', function ( Header ) {

		// load sub apps of header
		require( 'header/controllers/showController' );

		var API = {

			'showHeader' : function () {
				Header.Show.Controller.showHeader();
			}

		};

		Header.on( 'start', function () {
			API.showHeader();
		} );

		Vent.on( 'session:destroy', function () {
			API.showHeader();
		} );

		Vent.on( 'session:change', function () {
			API.showHeader();
		} );

	} );

} );
