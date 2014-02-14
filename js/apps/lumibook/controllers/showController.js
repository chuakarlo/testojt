define( function ( require ) {
	'use strict';

	var Vent = require( 'Vent' );

	return function ( Show, App ) {
		
		Show.Controller = {

			'showLumiBook' : function () {
				App.content.close();
				Vent.trigger( 'pd360:navigate', 'liveBook' );
				Vent.trigger( 'pd360:show' );
			}

		};

	};

} );
