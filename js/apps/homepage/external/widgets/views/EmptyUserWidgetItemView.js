define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template  = require( 'text!apps/homepage/external/widgets/templates/emptyWidgetItemView.html' );

	return Marionette.ItemView.extend( {
		'tagName'   : 'li',
		'template'  : _.template( template ),
		'className' : 'widget-specific widget-placeholder-wrapper no-padding'
	} );
} );
