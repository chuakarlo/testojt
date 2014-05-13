define( function ( require ) {
	'use strict';

	var App                = require( 'App' );
	var ForgotPasswordView = require( 'user/views/login/ForgotPasswordView' );

	App.module( 'User.ForgotPassword', function ( ForgotPassword ) {

		ForgotPassword.Controller = {

			'showForgotPassword' : function () {

				// show a loading view while data is fetching
				var loadingView = new App.Common.LoadingView();
				App.content.show( loadingView );

				var forgotPasswordView = new ForgotPasswordView( {
					// 'model'  : new App.Entities.Personnel()
				} );

				App.content.show( forgotPasswordView );

			}

		};

	} );

} );
