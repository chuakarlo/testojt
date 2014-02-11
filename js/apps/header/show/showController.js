define( function ( require ) {
	'use strict';

	var Menu = require( 'views/nav/NavView' );

	return function ( Show, App ) {

		Show.Controller = {

			'showHeader' : function () {
				var menu = new Menu();
				App.menu.show( menu );
			}
			
		};

	};
	
} );
