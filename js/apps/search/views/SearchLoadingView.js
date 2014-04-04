define( function( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var template   = require( 'text!../templates/SearchLoadingView.html' );
	var Marionette = require( 'marionette' );
	return Marionette.ItemView.extend( {
		
		'template'  : _.template( template ),

		'className' : 'cn-loading-view',

		'ui' : {
			'spinner' : '.loading-spinner'
		},

		'onShow' : function() {
			this.ui.spinner.spin();
		},
	} );
} );