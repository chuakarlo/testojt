define( function ( require ) {
	'use strict';

	return function ( Show, App ) {

		Show.Controller = {

			'showCommunities' : function () {
				App.PD360.navigate( null, 'communities', 'communitiesBrowse' );
			}

		};

	};

} );
