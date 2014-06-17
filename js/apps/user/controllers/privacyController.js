define( function ( require ) {
	'use strict';

	var App         = require( 'App' );
	var PrivacyView = require( 'user/views/privacy/PrivacyView' );

	App.module( 'User.Privacy', function ( Privacy ) {

		Privacy.Controller = {

			'showPrivacy' : function () {

				App.content.show( new PrivacyView( { } ) );

			}

		};

	} );

} );
