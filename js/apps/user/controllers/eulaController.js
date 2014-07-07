define( function ( require ) {
	'use strict';

	var App            = require( 'App' );
	var EulaContent    = require( 'user/views/eula/EulaContent' );
	var EulaLayout     = require( 'user/views/eula/EulaLayout' );
	var EulaTextLayout = require( 'user/views/eula/EulaTextLayout' );

	App.module( 'User.Eula', function ( Eula ) {

		Eula.Controller = {

			'showEula' : function () {

				// If EULA page is refreshed the session won't exist quite yet
				// The catchall handler will retry when personnel exists
				if ( App.request( 'session:personnel' ) ) {

					var personnel = new App.Entities.Personnel( App.request( 'session:personnel' ) );

					var eulaLayout  = new EulaLayout( {
						'model' : personnel
					} );

					// Show EULA layout
					App.content.show( eulaLayout );

					// Add the EULA Content to the layout
					eulaLayout.eulaRegion.show( new EulaContent() );

					App.vent.trigger( 'flash:message', {
						'message' : 'Before proceeding, you must accept the terms of the End User License Agreement.',
						'type'    : 'error'
					} );

				}

			},

			'showEulaText' : function () {

				var eulaTextLayout  = new EulaTextLayout();

				// Show EULA layout
				App.content.show( eulaTextLayout );

				// Add the EULA Content to the layout
				eulaTextLayout.eulaRegion.show( new EulaContent() );

			}

		};

	} );

} );
