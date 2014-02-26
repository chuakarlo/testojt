define( function ( require ) {
	'use strict';

	return function ( Show, App ) {
		
		Show.Controller = {

			'showLumiBook' : function () {
				App.PD360.navigate( null, 'liveBook' );
			}

		};

	};

} );
