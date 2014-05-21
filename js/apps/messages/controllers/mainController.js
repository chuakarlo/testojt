define( function ( require ) {
	'use strict';

	var App          = require( 'App' );
	var MessagesView = require( 'apps/messages/views/MessagesView' );

	App.module( 'Messages.Main', function ( Main ) {

		Main.controller = {

			'showMessages' : function () {
				// redirect to Legacy Page
				var pd360Loaded = App.request( 'pd360:loaded' );

				// show a loading view while we wait
				App.content.show( new App.Common.LoadingView() );

				// navigate to legacy page
				App.when( pd360Loaded ).done( function () {

					// show header
					App.content.show( new MessagesView() );

					// show flex page
					App.request( 'pd360:navigate', 'home', 'homeMessages' );

				} );

			}

		};

	} );

} );
