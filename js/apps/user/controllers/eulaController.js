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

					App.vent.trigger( 'flash:message', {
						'message' : 'Before proceeding to PD 360, you must accept the terms of the End User License Agreement.',
						'type'    : 'error'
					} );

				} ).fail( function () {

					App.content.show( new App.Common.ErrorView( {
						'message' : 'There was an error loading the license agreement.',
						'flash'   : 'An error occurred. Please try again later.'
					} ) );

				} );

			}

		};

	} );

} );
