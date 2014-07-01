define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!videoPlayer/templates/segmentLabelItemView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),

		'id' : 'label-view',

		'ui' : {
			'segmentCount' : '#segment-count'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );
		},

		'onShow' : function () {
			this.ui.segmentCount.html( this.segmentCount );
		}

	} );

} );
