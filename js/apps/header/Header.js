define( function ( require ) {
	'use strict';

	var HeaderShow = require( './show/showController' );
	var Vent       = require( 'Vent' );

	return function ( Header, App ) {

		// load sub apps of header
		App.module( 'Header.Show', HeaderShow );

		var API = {

			'showHeader' : function () {
				Header.Show.Controller.showHeader();
			}

		};

		Header.on( 'start', function () {
			API.showHeader();
		} );

		Vent.on( 'session:change', function () {
			API.showHeader();
		} );

	};

} );
