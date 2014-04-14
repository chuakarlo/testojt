define( function ( require ) {
	'use strict';

	var View = require( 'communities/views/CommunitiesView' );
	var App  = require( 'App' );

	App.module( 'Communities.Show', function ( Show ) {

		Show.Controller = {

			'showCommunities' : function () {
				App.request( 'pd360:navigate', View, 'communities', 'communitiesBrowse' );
			}

		};

	} );

} );
