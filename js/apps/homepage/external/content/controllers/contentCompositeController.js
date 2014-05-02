define( function ( require ) {
	'use strict';

	var Backbone          = require( 'backbone' );

	return {
		'doInitialize' : function ( view ) {
			if ( view.model ) {
				view.collection = new Backbone.Collection( [ view.model ] );
			}
		},

		'doItemViewOptions' : function ( view ) {
			return {
				'parentView' : view
			};
		},

		'doId' : function ( view ) {
			return view.model ? view.model.get( 'id' ) + '-wrapper' : '';
		}
	};
} );
