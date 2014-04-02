define( function ( require ) {
	'use strict';

	var $                 = require('jquery');
	var Backbone          = require( 'backbone' );

	return {
		'doInitialize' : function ( view ) {
			if ( view.model ) {
				view.collection = new Backbone.Collection( [ view.model ] );
			}
		},

		'doTemplateHelpers' : function ( view ) {
			var _header = view.model ? view.model.get( 'baseObject' )._header : '';
			var header = $.isFunction( _header ) ? _header( view.model.get( 'baseObject' ).sharedData ) : _header;
			return {
				'heading' : header
			};
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