define( function ( require ) {
	'use strict';

	return function () {

		var parent     = [];
		var sharedData = {};

		//Register your external sections here
		require( 'apps/homepage/external/billboard/base' ).register( parent, sharedData );
		require( 'apps/homepage/external/widgets/base' ).register( parent, sharedData );
		require( 'apps/homepage/external/content2/base' ).register( parent, sharedData );

		return parent;
	};
});
