define( function ( require ) {
	'use strict';

	var Vent = require( 'Vent' );

	return function ( Show, App ) {

		Show.Controller = {

			'showCommunities' : function () {

				App.content.close();

				Vent.trigger( 'pd360:navigate', 'communities', 'communitiesBrowse' );

				Vent.trigger( 'pd360:show' );

			}

		};

	};

} );
