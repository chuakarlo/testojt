define( function ( require ) {
	'use strict';

	var App            = require( 'App' );
	var RegisterLayout = require( 'user/views/register/RegisterLayout' );
	var EulaContent    = require( 'user/views/eula/EulaContent' );

	require( 'common/entities/States' );
	require( 'common/entities/Districts' );
	require( 'common/entities/Schools' );

	App.module( 'User.Register', function ( Register ) {

		Register.Controller = {

			'showRegister' : function () {

				// show a loading view while data is fetching
				var loadingView = new App.Common.LoadingView();
				App.content.show( loadingView );

				var registerLayout = new RegisterLayout( {
					'model'  : new App.Entities.Personnel()
				} );

				App.content.show( registerLayout );

				var eulaContent = new EulaContent();
				registerLayout.eulaRegion.show( eulaContent );

			}

		};

	} );

} );
