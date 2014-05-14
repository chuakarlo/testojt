define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var App        = require( 'App' );

	var WidgetCompositeView     = require( 'apps/homepage/external/widgets/views/WidgetItemView' );
	var EmptyUserWidgetItemView = require( 'apps/homepage/external/widgets/views/EmptyUserWidgetItemView' );
	var template                = require( 'text!apps/homepage/external/widgets/templates/widgetCompositeView.html' );
	var utils                   = require( 'apps/homepage/external/widgets/controllers/widgetCompositeController' );
	var utilsUpperFirstLetter   = require( 'apps/homepage/utils/upperFirstLetter' );

	var panelStatuses     = [ 'opened', 'closed' ];
	var widgetSettingsBtn = $( '#widget-settings' );
	var maxWidget         = 3;

	var messages           = {
		'widgetLimitError' : 'You have reached the amount of widgets to be displayed on your homepage.',
		'widgetMinError'   : 'Action not allowed. You must have at least one active widget'
	};

	function closeMessage () {
		var err = $( '.flash-close' );
		if ( err ) {
			err.click();
		}
	}

	return Marionette.CompositeView.extend( {
		'events' : {
			'click #widget-settings-selection li'       : 'showWidgetPreview',
			'click #widget-settings-header li#all'      : 'showAllWidgets',
			'click #widget-settings-header li#active'   : 'showActiveWidgets',
			'click #widget-settings-header li#inactive' : 'showInactiveWidgets',
			'click .actions .save'                      : 'activateWidget',
			'click .actions .save-and-close'            : 'activateWidgetAndClose',
			'click .widget-icon-btn.inactive'           : 'activateWidget',
			'click .actions .remove'                    : 'deactivateWidget',
			'click .actions .remove-and-close'          : 'deactivateWidgetAndClose',
			'click .widget-icon-btn.active'             : 'deactivateWidget'
		},
		'id'              : 'widgets-settings-panel',
		'template'        : _.template( template ),
		'itemView'        : WidgetCompositeView,
		'itemViewOptions' : function () {
			return {
				'userWidgetCollection' : this.options.userWidgetCollection
			};
		},
		'itemViewContainer' : '#widget-settings-selection',

		'ui' : {
			'widgetSettingsHeader' : '#widget-settings-header ul',
			'widgetPreview'        : '#widget-settings-preview'
		},

		'showAllWidgets' : function ( e ) {
			closeMessage();
			utils.doShowAllWidgets( this, e );
		},

		'showActiveWidgets' : function ( e ) {
			closeMessage();
			utils.doShowActiveWidgets( this, e );
		},

		'showInactiveWidgets' : function ( e ) {
			closeMessage();
			utils.doShowInactiveWidgets( this, e );
		},

		'showWidgetPreview' : function ( e ) {
			utils.doShowWidgetPreview( this, e );
		},

		'getActiveWidgets' : function () {
			return utils.doGetActiveWidgets( this );
		},

		'getInactiveWidgets' : function () {
			return utils.doGetInactiveWidgets( this );
		},

		'getModelByClickEvent' : function ( e ) {
			return utils.doGetModelByClickEvent( this, e );
		},

		'activateWidget' : function ( e ) {
			e.stopPropagation();
			utils.doActivateWidget( this, e );
		},

		'activateWidgetAndClose' : function ( e ) {
			utils.doActivateWidget( this, e );
		},

		'deactivateWidget' : function ( e ) {
			e.stopPropagation();
			utils.doDeactivateWidget( this, e );
		},

		'deactivateWidgetAndClose' : function ( e ) {
			utils.doDeactivateWidget( this, e );
		},

		'showWidgetPlaceholder' : function () {
			$( '.widget-placeholder-wrapper' ).remove();
			var count = maxWidget - $( 'ul.active-widgets-container li' ).length;

			for ( var i = 0; i < count; i ++ ) {
				var emptyUserWidgetItemView = new EmptyUserWidgetItemView();
				$( 'ul.active-widgets-container' ).append( emptyUserWidgetItemView.render().el );
			}
		},

		'closeWidgetPanel' : function () {
			this.close();
			widgetSettingsBtn.removeClass( panelStatuses[ 0 ] );
			widgetSettingsBtn.addClass( panelStatuses[ 1 ] );
			closeMessage();
		},

		'addToWidgetCollection' : function ( model ) {
			utils.doAddToWidgetCollection( this, model );
		},

		'removeToWidgetCollection' : function ( model ) {
			utils.doRemoveToWidgetCollection( this, model );
		},

		'onTab' : function ( tab ) {
			var currentTabId = this.$el.find( 'li.selected' ).attr( 'id' );
			return currentTabId === tab ? true : false;
		},

		'hidePreviewErrorMsg' : function ( e ) {
			utils.doHidePreviewErrorMsg( this, e );
		},

		'displayLimitError' : function ( e ) {
			App.vent.trigger( 'flash:message', {
				'message' : messages.widgetLimitError
			} );
		},

		'changeButtonAttr' : function ( from, to ) {
			utils.doChangeButtonAttr( this, from, to );
		},

		'upperFirstLetter' : function ( text ) {
			return utilsUpperFirstLetter( text );
		},

		'changeWidgetIconBtnAttr' : function ( model, from, to ) {
			utils.doChangeWidgetIconBtnAttr( this, model, from, to );
		},

		'changeSelectedNavBtn' : function ( e ) {
			utils.doChangeSelectedNavBtn( e );
		},

		'changeWidgetSelectedTab' : function ( currentTabId ) {
			this.$el.find( 'li.selected' ).removeClass( 'selected' );
			this.$el.find( '#' + currentTabId ).addClass( 'selected' );
		}

	} );

} );
