define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	//-----------------------------------------------
	// Handle calls from flash so we know when to update the notification
	// count in the header
	//-----------------------------------------------
	window.updateNotificationCount = function ( count ) {
		// Trigger an event so anyone interested in the new count has access
		App.vent.trigger( 'notification:updateCount', count );
	};
} );
