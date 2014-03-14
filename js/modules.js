define( function ( require ) {
	'use strict';

	var Resources   = require( 'apps/resources' );
	var Header      = require( 'apps/header/Header' );
	var User        = require( 'apps/user/User' );
	var PD360       = require( 'apps/pd360/PD360' );
	var CommonViews = require( 'common/views' );

	// apply the modules to the app
	return function ( App ) {
		App.module( 'Header', Header );
		App.module( 'User', User );
		App.module( 'Resources', Resources );
		App.module( 'PD360', PD360 );

		// load common views
		App.module( 'Common', CommonViews );
	};
	
} );
