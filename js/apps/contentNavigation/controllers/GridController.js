// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	var views = {
		'ErrorView'  : require( 'contentNavigation/views/ErrorView' ),
		'GridLayout' : require( 'contentNavigation/views/Grid/GridLayoutView' )
	};

	return Marionette.Controller.extend( {
		'initialize' : function () {
			this.layoutView = new views.GridLayout();
		},

		'getView' : function () {
			return this.layoutView;
		}
	} );

} );