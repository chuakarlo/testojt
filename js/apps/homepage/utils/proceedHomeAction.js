define( function () {
	'use strict';

	var Backbone = require( 'backbone' );

	return {
		'proceedHomeAction' : function ( action ) {
			if ( Backbone.history.fragment === 'home' ) {
				action();
			}
		}
	} ;
} );
