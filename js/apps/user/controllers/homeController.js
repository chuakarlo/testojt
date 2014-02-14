define( function ( require ) {
	'use strict';

	var HomeView = require( '../views/home/HomeView' );

	return function ( Home, App ) {

		Home.Controller = {

			'showHome' : function () {
				var home = new HomeView();
				App.content.show( home );
			}

		};

	};

} );
