define( function ( require ) {
	'use strict';

	var Communities = require( './communities/Communities' );
	var Search      = require( './search/Search' );
	var Observation = require( './observation/Observation' );

	return function ( Resources, App ) {

		App.module( 'Communities', Communities );
		App.module( 'Search', Search );
		App.module( 'Observation', Observation );

	};

} );
