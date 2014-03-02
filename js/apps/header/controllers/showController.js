define( function ( require ) {
	'use strict';

	var Menu = require( 'header/views/NavLayout' );

	return function ( Show, App ) {

		Show.Controller = {

			'showHeader' : function () {
				var menu = new Menu( { 'authenticated' : App.request( 'session:authenticated' ) } );
				App.menu.show( menu );
			}

		};

	};

} );
