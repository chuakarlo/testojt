define( function ( require ) {
	'use strict';

	var Marionette              = require( 'marionette' );
	var $                       = require( 'jquery' );
	var _                       = require( 'underscore' );
	var App                     = require( 'App' );
	var template                = require( 'text!apps/homepage/external/widgets/templates/widgetItemView.html' );
	var widgetMobileItemView    = require( 'text!apps/homepage/external/widgets/templates/widgetMobileItemView.html' );
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
		.css('background-image', 'url(' + view.widgets.icon() + ')')
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
			if ( App.request( 'homepage:isHomeRoute' ) ) {
				doOnRender( this );
				this.showSequenceOverlay();
			}
		},

		'onShow' : function () {
			this.addMobileItems();
		},

		'showSequenceOverlay' : function () {
			doShowSequenceOverlay( this );
		},

		'addMobileItems' : function () {
			var mobileTemplate        = _.template( widgetMobileItemView );
			var mobileTemplateHelpers = {
				'WidgetId'     : this.model.id,
				'WidgetName'   : this.model.get( 'WidgetName' )(),
				'WidgetIcon'   : this.getWidgetIcon(),
				'WidgetStatus' : this.getWidgetStatus()
			};
			$( '#widget-mobile-selection ul' ).append( mobileTemplate( mobileTemplateHelpers ) );
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
