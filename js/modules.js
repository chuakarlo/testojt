define( function ( require ) {
	'use strict';

	var Resources = require( 'apps/resources' );
	var Header    = require( 'apps/header/headerApp' );
	var User      = require( 'apps/user/userApp' );

	// apply the modules to the app
	return function ( App ) {
		App.module( 'Header', Header );
		App.module( 'User', User );
		App.module( 'Resources', Resources );
	};
	
} );
