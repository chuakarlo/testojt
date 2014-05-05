define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var _               = require( 'underscore' );
	var template        = require( 'text!apps/homepage/external/widgets/templates/EmptyWidgetView.html' );

	var className = 'col-md-12 no-padding';

	return Marionette.ItemView.extend( {
		'template'        : _.template( template ),
		'className'       : function () {
			return className;
		},
		'templateHelpers' : function () {
			return {
				'content' : this.EmptyMessage
			};
		}
	} );
} );
