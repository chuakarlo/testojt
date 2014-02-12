define( function ( require ) {
	'use strict';

	var Communities   = require( './communities/Communities' );

	return function ( Resources, App ) {

		App.module( 'Communities', Communities );

	};

} );
