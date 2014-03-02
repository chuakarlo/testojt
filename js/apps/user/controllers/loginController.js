define( function ( require ) {
	'use strict';

	var LoginView = require( 'user/views/login/LoginView' );

	return function ( Login, App ) {

		Login.Controller = {

			'showLogin' : function () {
				var login = new LoginView();
				App.content.show( login );
			}

		};

	};

} );
