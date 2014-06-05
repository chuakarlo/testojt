define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );

	var App        = require( 'App' );
	var Session    = require( 'Session' );

	var template = require( 'text!apps/homepage/external/widgets/templates/mobileWidgetItemView.html' );

	var widgetStatuses  = [ 'active', 'inactive' ];
	var widgetIconClass = [ 'fa-plus', 'fa-minus' ];

	function doGetWidgetStatus ( view ) {
		var status = 'inactive';
		if ( view.options.actualUserWidgetCollection._byId[ view.model.get( 'WidgetId' ) ] ) {
			status = 'active';
		}
		return status;
	}

	function doGetWidgetIcon ( view ) {
		var icon = 'plus';
		if ( view.options.actualUserWidgetCollection._byId[ view.model.get( 'WidgetId' ) ] ) {
			icon = 'minus';
		}
		return icon;
	}

	function doGetKeyByWidgetId ( view ) {
		var actualUserWidgetCollection = view.options.actualUserWidgetCollection;

		for ( var i = 0; i < actualUserWidgetCollection.models.length; i++ ) {
			if ( actualUserWidgetCollection.models[ i ].id === view.model.id ) {
				return i + 1;
			}
		}
	}

	return Marionette.ItemView.extend( {
		'events' : {
			'click .active-xs'   : 'deactivateWidget',
			'click .inactive-xs' : 'activateWidget'
		},
		'tagName'         : 'li',
		'className'       : function () {
			return this.getWidgetStatus() + '-widget-mobile';
		},
		'template'        : _.template( template ),
		'templateHelpers'   : function () {
			return {
				'WidgetId'     : this.model.id,
				'WidgetName'   : this.model.get( 'WidgetName' )(),
				'WidgetIcon'   : this.getWidgetIcon(),
				'WidgetStatus' : this.getWidgetStatus()
			};
		},

		'activateWidget' : function ( e ) {
			if ( this.widgetLimitExceeded() ) {
				this.showMessageToUser( App.Homepage.Utils.message.widgetLimitError, 'error' );
			} else {
				this.changeItemUIXS( e );
				this.changeWidgetStatusBy( 'add' );
				this.closeMessageToUser();
			}
		},

		'deactivateWidget' : function ( e ) {
			if ( this.widgetMinimumReached() ) {
				this.showMessageToUser( App.Homepage.Utils.message.widgetMinError, 'error' );
			} else {
				this.changeItemUIXS( e );
				this.changeWidgetStatusBy( 'remove' );
				this.closeMessageToUser();
			}
		},

		'changeWidgetStatusBy' : function ( mode ) {
			var widget = {
				'PersonnelId' : Session.personnelId(),
				'WidgetId'    : this.model.id
			};
			var model  = mode === 'remove' ? this.model.id : widget;

			this.options.userWidgetCollection[ mode ]( model );
			this.options.actualUserWidgetCollection[ mode ]( model, { 'silent' : true } );
		},

		'widgetLimitExceeded' : function () {
			return this.options.userWidgetCollection.length >= 3 ? true : false;
		},

		'widgetMinimumReached' : function () {
			return this.options.userWidgetCollection.length === 1 ? true : false;
		},

		'showMessageToUser' : function ( message, type ) {
			App.vent.trigger( 'flash:message', {
				'message' : message,
				'type'    : type
			} );
		},

		'closeMessageToUser' : function () {
			$( '.flash-close' ).click();
		},

		'changeItemUIXS' : function ( e ) {
			var widgetItem     = this.$( e.currentTarget ).parent();
			var widgetItemIcon = this.$( e.currentTarget );
			var widgetStatus   = this.$( e.currentTarget ).attr( 'id' );

			if ( widgetStatus === 'active' ) {
				widgetItem.attr( 'class', widgetStatuses[ 1 ] + '-widget-mobile' );
				widgetItemIcon.attr( 'id', widgetStatuses[ 1 ] );
				this.switchClass( widgetItemIcon, widgetStatuses[ 0 ] + '-xs', widgetStatuses[ 1 ] + '-xs' );
				this.switchClass( widgetItemIcon, widgetIconClass[ 1 ], widgetIconClass[ 0 ] );
			} else {
				widgetItem.attr( 'class', widgetStatuses[ 0 ] + '-widget-mobile' );
				widgetItemIcon.attr( 'id', widgetStatuses[ 0 ] );
				this.switchClass( widgetItemIcon, widgetStatuses[ 1 ] + '-xs', widgetStatuses[ 0 ] + '-xs' );
				this.switchClass( widgetItemIcon, widgetIconClass[ 0 ], widgetIconClass[ 1 ] );
			}
		},

		'changeItemIdsClasses' : function () {

		},

		'switchClass' : function ( btn, oldClass, newClass ) {
			btn.removeClass( oldClass );
			btn.addClass( newClass );
		},

		'getKeyByWidgetId' : function () {
			return doGetKeyByWidgetId( this );
		},

		'getWidgetStatus' : function () {
			return doGetWidgetStatus( this );
		},

		'getWidgetIcon' : function () {
			return doGetWidgetIcon( this );
		}
	} );

} );
