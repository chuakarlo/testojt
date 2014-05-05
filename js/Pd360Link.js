define( function ( require ) {
	'use strict';

	var App = require( 'App' );
	var _   = require( 'underscore' );
	//-----------------------------------------------
	// Handle calls from flash to navigate elsewhere
	//-----------------------------------------------
	window.pd360link = function ( link ) {

		var url;
		//-----------------------
		// COMMUNITIES LINKS
		//-----------------------
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

			App.navigate( url );
		//-----------------------
		// LIVE BOOK LINKS
		//-----------------------
		} else if ( _.has( link, 'LB_ID' ) ) {
			url = '#resources/lumibook/' + link.LB_ID;

			if ( _.has( link, 'LB_IID' ) ) {
				url += '/' + link.LB_IID;
			}

			App.navigate( url );
		//-----------------------
		// VIDEO LINKS
		//-----------------------
		// TODO : this needs to account for TASKS depending on how the router
		// is expecting that argument
		} else if ( _.has( link, 'CONTENTID' ) ) {
			url = '#resources/videos/' + link.CONTENTID;

			App.navigate( url );
		//-----------------------
		// GROUP LINKS
		//-----------------------
		} else if ( _.has( link, 'JOINGROUP' ) ) {
			url = '#groups/' + link.JOINGROUP;

			App.navigate( url );
		//-----------------------
		// COLLEAGUE LINKS
		//-----------------------
		} else if ( _.has( link, 'SHOWPROFILE' ) ) {
			// We need to define what is happening here.
			return;
		}

	};

} );
