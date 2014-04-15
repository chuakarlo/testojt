define( function ( require ) {
	'use strict';

  var _                    = require( 'underscore' );
	var footerTemplate       = require( 'text!apps/homepage/external/what-to-do-next/templates/widgetFooterTemplate.html' );
	var WidgetItemCollection = require( 'apps/homepage/external/what-to-do-next/collections/WidgetItemCollection' );

	function doGetCollection( view, collection ) {
		var footer = _.template( footerTemplate, {
			'text' : view.baseObj._footer( collection ),
			'url'  : view.baseObj._mainUrl
		} );

		//get footer element then append
		view.$el.find( 'div.footer' ).append( footer );

		if( view._isRendered === true ) {
			view.collection.set( collection.models );
		}
	}

	return {
		'doInitialize' : function ( view, options ) {
			view.baseObj      = view.model.get( 'baseObject' );
			view.itemView     = view.baseObj.getExternalView;
			view.collection   = new WidgetItemCollection();

			var getCollection = view.baseObj._items;
			getCollection ( function ( collection ) {
				doGetCollection( view, collection );
			},
			options.model.get('baseObject').sharedData );
		},
		'setTemplateHelpers' : function ( view ) {
			return {
				'header' : view.baseObj._header(),
				'footer' : ''
			};
		},
		'doOnRender' : function ( view, parent ) {
			parent.$el.attr( { 'id' : view.baseObj._id } );
		}
	};
} );