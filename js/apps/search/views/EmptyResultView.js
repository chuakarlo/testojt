define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette');
	var template   = require( 'text!search/templates/EmptyResultView.html' );

	return Marionette.ItemView.extend( {

		'className' : 'no-results',
		'template'  : _.template( template )

	} );

} );
