define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {

		'template' : _.template( 'No items to display.' ),

		'className' : 'results-empty-view'

	} );

} );
