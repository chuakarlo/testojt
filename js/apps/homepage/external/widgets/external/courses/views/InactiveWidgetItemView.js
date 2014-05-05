define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/widgets/external/courses/templates/inactiveWidgetItemView.html' );

	var className = 'widget-wrapper';

	return Marionette.ItemView.extend( {

		'template'  : function () {
			return _.template( template );
		},
		'className' : function () {
			return className;
		}
	} );

} );
