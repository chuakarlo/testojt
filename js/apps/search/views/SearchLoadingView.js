define( function( require ) {
	'use strict';

	// var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var template   = require( 'text!../templates/SearchLoadingView.html' );
	var Marionette = require( 'marionette' );
	return Marionette.ItemView.extend( {
		
		'template'  : _.template( template ),

		'className' : 'search-loading-view',

		'ui' : {
			'spinner' : '.spinner-container'
		},

		'onShow' : function() {
			var parentWidth = this.$el.parent().innerWidth();
			var currentWidth = this.$el.innerWidth();
			var left = (parentWidth / 2) + currentWidth;
			left = left + 'px';

			this.$el.css('left', left);
			this.ui.spinner.spin();
		},
	} );
} );