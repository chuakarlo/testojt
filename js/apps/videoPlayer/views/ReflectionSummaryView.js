define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template   = require( 'text!videoPlayer/templates/reflectionSummary.html' );

	require( 'flipclock' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),

		'className' : 'right-bar',

		'initialize' : function ( options ) {
			options = options || { };
			_.extend( this, options );
		},

		'onRender' : function () {
			if ( this.diff ) {
				var countdown = Math.floor( this.diff * 3600 );
				var clock = this.$el.find( '#duration' ).FlipClock( countdown, {
					'countdown' : true
				} );
				clock.start();
			}
		}

	} );

} );
