define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'LumiBook.Show', function ( Show ) {
		
		Show.Controller = {

			'showLumiBook' : function () {
				App.PD360.navigate( null, 'liveBook' );
			}

		};

	} );

} );
