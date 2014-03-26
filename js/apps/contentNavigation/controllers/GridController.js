// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	var views = {
		'ErrorView'  : require( '../views/ErrorView' ),
		'GridLayout' : require( '../views/Grid/GridLayoutView' )
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