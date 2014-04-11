define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'LumiBook.Show', function ( Show ) {
		
		Show.Controller = {

			'showLumiBook' : function () {
				App.request( 'pd360:navigate', null, 'liveBook' );
			}

		};

	} );

} );
