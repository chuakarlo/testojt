define( function ( require ) {
	'use strict';

	var App = require( 'App' );
	var _   = require( 'underscore' );

	// -----------------------------------------------
	// Handle calls from flash to navigate elsewhere
	// -----------------------------------------------
	window.pd360link = function ( link ) {

		var url;
		// -----------------------
		// COMMUNITIES LINKS
		// -----------------------
		if ( _.has(  link, 'LOCTYPE' ) ) {
			url = '#resources/communities/' + link.LOCTYPE;

			// Since none of these are guarenteed...
			_.each( [ 'LOC', 'THREAD', 'POST', 'TASK' ], function ( val ) {
				if ( _.has( link, val ) ) {

					// If it contains a task, add a extra arg to the url
					if ( val === 'TASK' ) {
						url += '/task';
					}
					url += '/' + link[ val ];
				}
			} );

		// -----------------------
		// LIVE BOOK LINKS
		// -----------------------
		} else if ( _.has( link, 'LB_ID' ) ) {
			url = '#resources/lumibook/' + link.LB_ID;

			if ( _.has( link, 'LB_IID' ) ) {
				url += '/' + link.LB_IID;
			}

		// -----------------------
		// VIDEO LINKS
		// -----------------------
		// TODO : this needs to account for TASKS depending on how the router
		// is expecting that argument
		} else if ( _.has( link, 'CONTENTID' ) ) {
			url = '#resources/videos/' + link.CONTENTID;

		// User Uploaded Video
		} else if ( _.has( link, 'UUVIDEOID' ) ) {
			url = '#resources/videos/' + link.UUVIDEOID + '?uuv=true';

		// -----------------------
		// GROUP LINKS
		// -----------------------
		} else if ( _.has( link, 'LISTGROUPS' ) ) {
			url = '#groups';
		} else if ( _.has( link, 'JOINGROUP' ) ) {
			url = '#groups/' + link.JOINGROUP;
		}

		// If we built a url, navigate to it.
		if ( url ) {
			App.navigate( url, {
				'trigger' : true
			} );
		}

	};

} );
