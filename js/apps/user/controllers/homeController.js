define( function ( require ) {
	'use strict';

	var HomeView = require( 'user/views/home/HomeView' );
	var App      = require( 'App' );

	App.module( 'User.Home', function ( Home ) {

		Home.Controller = {

			'showHome' : function () {
				var home = new HomeView();
				App.content.show( home );
			}

		};

	} );

} );
