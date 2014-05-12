define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var HomeView = require( 'apps/homepage/views/BaseItemView' );

	var districtUtils = require( 'apps/homepage/utils/districtUtil' );
	var homepageUtils = require( 'apps/homepage/utils/homepageUtil' );

	App.module( 'Homepage.Show', function ( Show ) {
		Show.Controller = {
			'showHomepage' : function () {

				var homeLayout = new HomeView();
				App.content.show( homeLayout );

				homepageUtils.loadHomepage( homeLayout );
				districtUtils.processDistrictMessage( homeLayout );

			}
		};
	} );
} );
