define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'Communities.Show', function ( Show ) {

		Show.Controller = {

			'showCommunities' : function () {
				App.request( 'pd360:navigate', null, 'communities', 'communitiesBrowse' );
			}

		};

	} );

} );
