define( function ( require ) {
	'use strict';

	return function () {

		var parent = [ ];

		require( 'apps/homepage/external/widgets/external/null/base' ).registerWidget( parent );
		require( 'apps/homepage/external/widgets/external/courses/base' ).registerWidget( parent );
		require( 'apps/homepage/external/widgets/external/focusObjective/base' ).registerWidget( parent );
		require( 'apps/homepage/external/widgets/external/groupActivity/base' ).registerWidget( parent );
		require( 'apps/homepage/external/widgets/external/yourProfile/base' ).registerWidget( parent );
		require( 'apps/homepage/external/widgets/external/observationsOfMe/base' ).registerWidget( parent );

		return parent;
	};
});
