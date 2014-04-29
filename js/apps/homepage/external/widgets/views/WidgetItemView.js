define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template                = require( 'text!apps/homepage/external/widgets/templates/widgetItemView.html' );
	var sequenceOverlayTemplate = require( 'text!apps/homepage/external/widgets/templates/widgetSequenceOverlayTemplate.html' );
	var widgetLookup            = require( 'apps/homepage/external/widgets/manifest' );

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

	function doShowSequenceOverlay ( view ) {
		var widgetKey        = view.getKeyByWidgetId();
		var sequenceTemplate = _.template( sequenceOverlayTemplate, { 'sequence' : widgetKey } );

		if ( widgetKey ) {
			view.$el.prepend( sequenceTemplate );
		}
	}

	function doGetKeyByWidgetId ( view ) {
		var userWidgetCollection = view.options.userWidgetCollection;

		for ( var i = 0; i < userWidgetCollection.models.length; i++ ) {
			if ( userWidgetCollection.models[ i ].id === view.model.id ) {
				return i + 1;
			}
		}
	}

	return Marionette.CompositeView.extend( {
		'tagName'         : 'li',
		'className'       : 'img-thumbnail',
		'template'        : _.template( template ),
		'templateHelpers' : function () {
			return setTemplateHelpers( this );
		},

		'onRender' : function ( options ) {
			doOnRender( this );
			this.showSequenceOverlay();
		},

		'showSequenceOverlay' : function () {
			doShowSequenceOverlay( this );
		},

		'getKeyByWidgetId' : function () {
			return doGetKeyByWidgetId( this );
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
