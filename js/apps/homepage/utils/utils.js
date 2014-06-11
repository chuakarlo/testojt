define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'Homepage.Utils', function ( Utils ) {
		Utils.limitCharacters       = require( 'apps/homepage/utils/limitCharacters' );
		Utils.limitCharsByDOMLength = require( 'apps/homepage/utils/limitCharsByDOMLength' );
		Utils.modelGet              = require( 'apps/homepage/utils/modelGet' );
		Utils.progressCircle        = require( 'apps/homepage/utils/progressCircle' );
		Utils.compareDate           = require( 'apps/homepage/utils/compareDate' );
		Utils.timeDiff              = require( 'apps/homepage/utils/timeDiff' );
		Utils.message               = require( 'apps/homepage/utils/message' );
		Utils.navigate              = require( 'apps/homepage/utils/navigate' );
		Utils.redirect              = require( 'apps/homepage/utils/redirect' );
	} );
} );
