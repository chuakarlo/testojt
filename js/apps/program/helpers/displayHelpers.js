define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	return {

		'displayError' : function ( error ) {

			var message = error ? error : 'Error initializing contents. Please try again later.';

			App.content.show( new App.Common.ErrorView( {
				'message' : message,
				'flash'   : message
			} ) );
		},

		'displayLoading' : function ( message, region ) {
			App.flashMessage.close();

			var loading = new App.Common.LoadingView( {
				'size'       : 'small',
				'background' : false,
				'text'       : message
			} );

			region.show( loading );
		}
	};

} );
