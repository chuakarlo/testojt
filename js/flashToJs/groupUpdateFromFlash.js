define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	// -----------------------------------------------
	// Handle calls from flash so we know when to update the group information
	// -----------------------------------------------
	window.groupUpdateFromFlash = function ( count ) {
		// Trigger an event so any active group view interested will know to
		// fetch it's data.
		App.vent.trigger( 'group:updateFromFlash' );
	};
} );
