define( function ( require ) {
	'use strict';

	var App          = require( 'App' );
	var RegisterView = require( 'user/views/register/RegisterView' );

	require( 'common/entities/States' );
	require( 'common/entities/Districts' );
	require( 'common/entities/Schools' );

	App.module( 'User.Register', function ( Register ) {

		Register.Controller = {

			'showRegister' : function () {

				// show a loading view while data is fetching
				var loadingView = new App.Common.LoadingView();
				App.content.show( loadingView );

				var register = new RegisterView( {
					'model'  : new App.Entities.Personnel()
				} );

				App.content.show( register );

			}

		};

	} );

} );
