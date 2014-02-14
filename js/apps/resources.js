define( function ( require ) {
	'use strict';

	var Communities = require( './communities/Communities' );
	var Search      = require( './search/Search' );

	return function ( Resources, App ) {

		App.module( 'Communities', Communities );
		App.module( 'Search', Search );

	};

} );
