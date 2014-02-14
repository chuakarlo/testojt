define( function ( require ) {
	'use strict';

	var LoginView = require( '../views/login/LoginView' );

	return function ( Login, App ) {

		Login.Controller = {

			'showLogin' : function () {
				var login = new LoginView();
				App.content.show( login );
			}

		};

	};

} );
