define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	// var $          = require( 'jquery' );
	var _          = require( 'underscore' );

	var App        = require( 'App' );
	var Session    = require( 'Session' );

	var widgetLookup = App.Homepage.Widgets.allWidgets;

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
		return view.options.userWidgetCollection._byId[ view.model.get( 'WidgetId' ) ] ? 'active' : 'inactive';
	}

	function doGetWidgetIcon ( view ) {
		return view.options.userWidgetCollection._byId[ view.model.get( 'WidgetId' ) ] ? 'minus' : 'plus';
	}

	function doShowSequenceOverlay ( view ) {
		var widgetKey        = view.getKeyByWidgetId();
		var sequenceTemplate = _.template( require( 'text!apps/homepage/external/widgets/templates/widgetSequenceOverlayTemplate.html' ), { 'sequence' : widgetKey } );

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

	function processWidgetAction ( view, e, cond, action, errMsg ) {
		if ( !view[ cond ]() ) {
			view.changeWidgetStatusBy( action );
			view.showWidgetPreview( e );
		} else {
			view.showMessageToUser( App.Homepage.Utils.message[ errMsg ], 'error' );
		}
	}

	return Marionette.ItemView.extend( {
		'events' : {
			'click .widget-icon-btn.active'   : 'deactivateWidget',
			'click .widget-icon-btn.inactive' : 'activateWidget'
		},
		'tagName'         : 'li',
		'template'        : _.template( require( 'text!apps/homepage/external/widgets/templates/widgetItemView.html' ) ),
		'className'       : 'img-thumbnail',
		'templateHelpers' : function () {
			return setTemplateHelpers( this );
		},

		'activateWidget' : function ( e ) {
			processWidgetAction( this, e, 'widgetLimitExceeded', 'add', 'widgetLimitError' );
		},

		'deactivateWidget' : function ( e ) {
			processWidgetAction( this, e, 'widgetMinimumReached', 'remove', 'widgetMinError' );
		},

		'changeWidgetStatusBy' : function ( mode ) {
			var widget = {
				'PersonnelId' : Session.personnelId(),
				'WidgetId'    : this.model.id
			};
			var model  = mode === 'remove' ? this.model.id : widget;

			this.options.userWidgetCollection[ mode ]( model );
		},

		'widgetLimitExceeded' : function () {
			return this.options.userWidgetCollection.length >= 3 ? true : false;
		},

		'widgetMinimumReached' : function () {
			return this.options.userWidgetCollection.length === 1 ? true : false;
		},

		'showWidgetPreview' : function ( e ) {
			App.vent.trigger( 'homepage:showWidgetPreview', e );
		},

		'showMessageToUser' : function ( message, type ) {
			App.vent.trigger( 'flash:message', {
				'message' : message,
				'type'    : type
			} );
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
		},

		'onRender' : function ( options ) {
			if ( App.request( 'homepage:isHomeRoute' ) ) {
				doOnRender( this );
				this.showSequenceOverlay();
			}
		}
	} );

} );
