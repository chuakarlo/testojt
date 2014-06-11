define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	function LoadAllWidgets () {
		var parent = [ ];

		require( 'apps/homepage/external/widgets/external/null/base' ).registerWidget( parent );
		require( 'apps/homepage/external/widgets/external/courses/base' ).registerWidget( parent );
		require( 'apps/homepage/external/widgets/external/focusObjective/base' ).registerWidget( parent );
		require( 'apps/homepage/external/widgets/external/groupActivity/base' ).registerWidget( parent );
		require( 'apps/homepage/external/widgets/external/yourProfile/base' ).registerWidget( parent );
		require( 'apps/homepage/external/widgets/external/observationsOfMe/base' ).registerWidget( parent );
		require( 'apps/homepage/external/widgets/external/processOfMe/base' ).registerWidget( parent );

		return parent;
	}

	App.module( 'Homepage.Widgets', function ( Widgets ) {
		Widgets.allWidgets = LoadAllWidgets;
	} );

});
