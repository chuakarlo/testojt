define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template = require( 'text!apps/homepage/external/widgets/templates/widgetItemView.html' );
	var widgetLookup = require( 'apps/homepage/external/widgets/manifest' );

	function setTemplateHelpers ( view ) {
		view.widgets = widgetLookup()[ view.model.get( 'WidgetId' ) ];
		return {
			'widgetStatus' : view.getWidgetStatus(),
			'widgetIcon'   : view.getWidgetIcon(),
			'WidgetName'   : view.widgets.WidgetName()
		};
	}

	function doOnRender ( view ) {
		view.$el
		.css('background-image', 'url(' + view.widgets.imgSrc() + ')')
		.css('background-size', '100%' );
		var heading = view.$el.find('.setTop');
		heading.css('top', view.$el.height - heading.height);
	}

	function getAttributes ( view ) {
		return {
			'data-id' : view.model.get( 'WidgetId' )
		};
	}

	function doGetWidgetStatus ( view ) {
		var status = 'inactive';
		if ( view.options.userWidgetCollection._byId[ view.model.get( 'WidgetId' ) ] ) {
			status = 'active';
		}
		return status;
	}

	function doGetWidgetIcon ( view ) {
		var icon = 'plus';
		if ( view.options.userWidgetCollection._byId[ view.model.get( 'WidgetId' ) ] ) {
			icon = 'minus';
		}
		return icon;
	}

	return Marionette.CompositeView.extend( {
		'tagName'         : 'li',
		'template'        : _.template( template ),
		'templateHelpers' : function () {
			return setTemplateHelpers( this );
		},

		'onRender' : function ( ) {
			doOnRender( this );
		},

		'attributes' : function () {
			return getAttributes( this );
		},

		'getWidgetStatus' : function () {
			return doGetWidgetStatus( this );
		},

		'getWidgetIcon' : function () {
			return doGetWidgetIcon( this );
		}
	} );
} );
