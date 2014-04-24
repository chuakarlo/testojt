define( function ( require ) {
	'use strict';

	var Marionette           = require( 'marionette' );
	var _                    = require( 'underscore' );
	var template             = require( 'text!apps/homepage/external/widgets/templates/userWidgetCompositeView.html' );
	var footerTemplate       = require( 'text!apps/homepage/external/widgets/templates/widgetFooterTemplate.html' );
	var widgetLookup         = require( 'apps/homepage/external/widgets/manifest' );
	var WidgetItemCollection = require( 'apps/homepage/external/widgets/collections/WidgetItemCollection' );

	function doGetCollection( view, collection, widgets ) {

		var footer = _.template( footerTemplate, {
			'text' : widgets._footer( collection ),
			'url'  : widgets._mainUrl
		} );

		view.$el.find( 'div.footer' ).append( footer );

		if( view._isRendered === true ) {
			view.collection.set( collection.models );
		}
	}

	function setTemplateHelpers ( view ) {
		var widgets = widgetLookup()[ view.model.get( 'WidgetId' ) ];
		return {
			'header' : widgets.header(),
			'footer' : ''
		};
	}

	function doInitialize ( view ) {
		var widgets = widgetLookup()[ view.model.get( 'WidgetId' ) ];

		view.itemView   = widgets.getExternalView;
		view.collection = new WidgetItemCollection();

		var _this = view;

		var getCollection = widgets._items;
		getCollection ( function ( collection ) {
			doGetCollection( _this, collection, widgets );
		}, { } );
	}

	function doOnRender ( view ) {
		var widgets = widgetLookup()[ view.model.get( 'WidgetId' ) ];
		view.$el.attr( { 'id' : widgets._id } );
	}

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'tagName'           : 'li',
		'className'         : 'col-md-4 no-padding',
		'itemViewContainer' : '.item-container',
		'templateHelpers'   : function () {
			return setTemplateHelpers( this );
		},
		'initialize' : function () {
			doInitialize( this );
		},
		'onRender' : function () {
			doOnRender( this );
		}
	} );

} );
