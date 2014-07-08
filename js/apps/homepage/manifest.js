define( function ( require ) {
	'use strict';

	return function () {

		var parent         = [ ];
		var sharedData     = { };
		var App            = require( 'App' );
		var widgetMessages = require( 'text!apps/homepage/external/widgets/configuration/messages.json' );

		//Register your external sections here
		require( 'apps/homepage/external/billboard/base' ).register( parent, sharedData );
		require( 'apps/homepage/external/widgets/base' ).register( parent, sharedData, function () {
			App.Homepage.Utils.loadMessages( widgetMessages );
		} );
		require( 'apps/homepage/external/content3/base' ).register( parent, sharedData );

		return parent;
	};
} );
