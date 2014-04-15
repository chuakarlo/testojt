define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/what-to-do-next/external/process/templates/inactiveWidgetItemView.html' );

	return Marionette.ItemView.extend( {

		'template'   : _.template( template ),
		'className' : 'widget-wrapper row'
	} );

} );