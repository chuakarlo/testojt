define( function ( require ) {
	
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template   = require( 'text!apps/contentNavigation/templates/Filters/FilterLayoutViewTemplate.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template )

	} );
} );