define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	return {
		'doInitialize' : function ( view ) {
			if ( view.model ) {
				view.collection = new Backbone.Collection( [ view.model ] );
			}

			App.vent.on( 'homepage:' + view.model.id + 'Render', function () {
				return view.render();
			} );
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
