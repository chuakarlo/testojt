define( function ( require ) {
	'use strict';

	var Marionette           = require( 'marionette' );
	var Backbone             = require( 'backbone' );
	var _                    = require( 'underscore' );
	var App                  = require( 'App' );
	var template             = require( 'text!apps/homepage/external/widgets/templates/userWidgetCompositeView.html' );
	var ItemView             = require( 'apps/homepage/external/widgets/views/EmptyWidgetView' );
	var footerTemplate       = require( 'text!apps/homepage/external/widgets/templates/widgetFooterTemplate.html' );
	var WidgetItemCollection = require( 'apps/homepage/external/widgets/collections/WidgetItemCollection' );

	function returnCollection ( view, collection, widgets ) {
		return collection;
	}

	function replaceCollection ( view, collection, widgets ) {
		view.itemView                        = ItemView;
		view.itemView.prototype.EmptyMessage = widgets.EmptyMessage();
		view.itemView.prototype.EmptyType    = widgets.EmptyType();
		return new Backbone.Collection( [ { } ] );
	}

	var emptyViewActions = {
		true  : returnCollection,
		false : replaceCollection
	};

	function doGetCollection ( view, collection, widgets ) {

		collection = emptyViewActions[ collection.length > 0 ]( view, collection, widgets );

		var footer = _.template( footerTemplate, {
			'text' : widgets._footer( collection ),
			'url'  : widgets._mainUrl
		} );

		view.$el.find( 'div.footer' ).append( footer );

		view.$el.on( 'click touchstart', 'a.footerLink', function ( e ) {
			App.Homepage.Utils.redirect( e );
			return false;
		} );

		if ( view._isRendered === true ) {
			view.collection.set( collection.models );
		}
	}

	function setTemplateHelpers ( view ) {
		var widgets = App.Homepage.Widgets.allWidgets()[ view.model.get( 'WidgetId' ) ];
		return {
			'header' : widgets.header(),
			'footer' : ''
		};
	}

	function doInitialize ( view ) {
		var widgets = App.Homepage.Widgets.allWidgets()[ view.model.get( 'WidgetId' ) ];
		view.itemView   = widgets.getExternalView;
		view.collection = new WidgetItemCollection();

		widgets._items ( function ( collection ) {
			doGetCollection( view, collection, widgets );
		}, { } );
	}

	function doOnRender ( view ) {
		var widgets = App.Homepage.Widgets.allWidgets()[ view.model.get( 'WidgetId' ) ];
		view.$el.attr( { 'id' : widgets._id } );
	}

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'tagName'           : 'li',
		'className'         : 'widget-specific',
		'itemViewContainer' : '.item-container',
		'emptyView'         : App.Common.LoadingView,

		'templateHelpers'   : function () {
			return setTemplateHelpers( this );
		},
		'initialize'        : function () {
			doInitialize( this );
		},
		'onRender'          : function () {
			if ( App.request( 'homepage:isHomeRoute' ) ) {
				doOnRender( this );
			}
		},
		'onShow'            : function () {
			this.$el.parent().find( '.widget-specific:first-child' ).addClass( 'shown' );
		}
	} );

} );
