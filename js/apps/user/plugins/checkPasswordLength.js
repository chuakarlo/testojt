define( function ( require ) {
	'use strict';

	var $   = require( 'jquery' );
	var App = require( 'App' );

	return function ( element, maxLength ) {
		if ( element.value.length > 12 && !$( '.flash-message-container' )[ 0 ] ) {
			var message = {
					'message' : 'Password length has already exceeded the maximum length of 12 characters.',
					'type'    : 'warning',
					'timeout' : false
				};
			App.vent.trigger( 'flash:message' , message );
		} else if ( element.value.length < 13 && $( '.flash-message-container' )[ 0 ] ) {
			App.flashMessage.close();
		}
	};

} );
