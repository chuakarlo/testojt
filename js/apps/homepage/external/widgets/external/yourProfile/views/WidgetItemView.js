define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var _               = require( 'underscore' );
	var template        = require( 'text!apps/homepage/external/widgets/external/yourProfile/templates/widgetItemView.html' );

	return Marionette.ItemView.extend( {
		'template'  : _.template( template ),
		'className' : 'col-md-12 no-padding yourProfile'
	} );
} );
