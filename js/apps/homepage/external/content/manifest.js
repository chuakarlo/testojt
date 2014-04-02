define( function ( require ) {
	'use strict';

	return function ( options ) {

		var parent     = [];
		var sharedData = options;

		//Register your external sections here
		require( 'apps/homepage/external/content/external/your-queue/base' ).register( parent, sharedData );
		require( 'apps/homepage/external/content/external/recommended/base' ).register( parent, sharedData );

		return parent;
	};
});