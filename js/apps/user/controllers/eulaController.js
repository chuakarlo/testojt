define( function ( require ) {
	'use strict';

	var $           = require( 'jquery' );
	var App         = require( 'App' );
	var EulaLayout  = require( 'user/views/eula/EulaLayout' );
	var EulaContent = require( 'user/views/eula/EulaContent' );

	App.module( 'User.Eula', function ( Eula ) {

		Eula.Controller = {

			'showEula' : function () {

				// show a loading view while data is fetching
				var loadingView = new App.Common.LoadingView();
				App.content.show( loadingView );

				var personnelRequest = App.request( 'user:personnel' );

				$.when( personnelRequest ).done( function ( personnel ) {

					var eulaContent = new EulaContent();
					var eulaLayout  = new EulaLayout( {
						'model'  : personnel
					} );


					App.content.show( eulaLayout );

					eulaLayout.eulaRegion.show( eulaContent );

				});

			}

		};

	} );

} );
