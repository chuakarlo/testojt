define( function ( require ) {
	'use strict';

	var App         = require( 'App' );
	var SuccessView = require( 'user/views/login/SuccessView' );

	App.module( 'User.Success', function ( Success ) {

		Success.Controller = {

			showSuccess : function () {
				var successView = new SuccessView();
				App.content.show( successView );
			}

		};

	} );

} );
