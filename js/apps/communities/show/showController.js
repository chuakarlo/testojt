define( function ( require ) {
	'use strict';

	var Vent = require( 'Vent' );

	return function ( Show, App ) {

		Show.Controller = {

			'showCommunities' : function () {

				App.content.close();

				Vent.trigger( 'flash:navigate', 'communities', 'communitiesBrowse' );

				Vent.trigger( 'flash:show' );

			}

		};

	};

} );
