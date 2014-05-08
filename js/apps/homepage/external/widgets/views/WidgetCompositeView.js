define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );

	var WidgetCompositeView          = require( 'apps/homepage/external/widgets/views/WidgetItemView' );
	var template                     = require( 'text!apps/homepage/external/widgets/templates/widgetCompositeView.html' );
	var utils                        = require( 'apps/homepage/external/widgets/controllers/widgetCompositeController' );
	var utilsUpperFirstLetter        = require( 'apps/homepage/utils/upperFirstLetter' );

	var panelStatuses     = [ 'opened', 'closed' ];
	var widgetSettingsBtn = $( '#widget-settings' );

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
			utils.doShowAllWidgets( this, e );
		},

		'showActiveWidgets' : function ( e ) {
			utils.doShowActiveWidgets( this, e );
		},

		'showInactiveWidgets' : function ( e ) {
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
			this.hidePreviewErrorMsg( e );
			utils.doDeactivateWidget( this, e );
		},

		'deactivateWidgetAndClose' : function ( e ) {
			utils.doDeactivateWidget( this, e );
			this.closeWidgetPanel();
		},

		'closeWidgetPanel' : function () {
			this.close();
			widgetSettingsBtn.removeClass( panelStatuses[ 0 ] );
			widgetSettingsBtn.addClass( panelStatuses[ 1 ] );
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
			utils.doDisplayLimitError( this, e );
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
