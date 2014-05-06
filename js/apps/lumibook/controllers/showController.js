define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'LumiBook.Show', function ( Show ) {

		Show.Controller = {

			'showLumiBook' : function () {
				var pd360Loaded = App.request( 'pd360:loaded' );

				App.content.show( new App.Common.LoadingView() );

				App.when( pd360Loaded ).done( function () {
					App.content.close();
					App.request( 'pd360:navigate', 'liveBook' );
				} );
			}

		};

	} );

} );
