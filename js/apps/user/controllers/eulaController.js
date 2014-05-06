define( function ( require ) {
	'use strict';

	var App         = require( 'App' );
	var EulaLayout  = require( 'user/views/eula/EulaLayout' );
	var EulaContent = require( 'user/views/eula/EulaContent' );

	App.module( 'User.Eula', function ( Eula ) {

		Eula.Controller = {

			'showEula' : function () {
				var personnelRequest = App.request( 'user:personnel' );

				// show a loading view while data is fetching
				App.content.show( new App.Common.LoadingView() );

				App.when( personnelRequest ).done( function ( personnel ) {

					var eulaContent = new EulaContent();
					var eulaLayout  = new EulaLayout( {
						'model' : personnel
					} );

					App.content.show( eulaLayout );

					eulaLayout.eulaRegion.show( eulaContent );

				});

			}

		};

	} );

} );
