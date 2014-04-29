define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var WidgetCompositeView   = require( 'apps/homepage/external/widgets/views/WidgetItemView' );
	var template              = require( 'text!apps/homepage/external/widgets/templates/widgetCompositeView.html' );
	var utils                 = require( 'apps/homepage/external/widgets/controllers/widgetCompositeController' );
	var utilsUpperFirstLetter = require( 'apps/homepage/utils/upperFirstLetter' );

	return Marionette.CompositeView.extend( {
		'events' : {
			'click #widget-settings-selection li'       : 'showWidgetPreview',
			'click #widget-settings-header li#all'      : 'showAllWidgets',
			'click #widget-settings-header li#active'   : 'showActiveWidgets',
			'click #widget-settings-header li#inactive' : 'showInactiveWidgets',
			'click .actions .save'                      : 'activateWidget',
			'click .widget-icon-btn.inactive'           : 'activateWidget',
			'click .actions .remove'                    : 'deactivateWidget',
			'click .widget-icon-btn.active'             : 'deactivateWidget'
		},
		'template'        : _.template( template ),
		'itemView'        : WidgetCompositeView,
		'itemViewOptions' : function () {
			return {
				'userWidgetCollection' : this.options.userWidgetCollection
			};
		},
		'itemViewContainer' : '#widget-settings-selection',

		'ui' : {
			'widgetPreview' : '#widget-settings-preview'
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
			utils.doActivateWidget( this, e );
		},

		'deactivateWidget' : function ( e ) {
			utils.doDeactivateWidget( this, e );
		},

		'addToWidgetCollection' : function ( model ) {
			utils.doAddToWidgetCollection( this, model );
		},

		'removeToWidgetCollection' : function ( model ) {
			utils.doRemoveToWidgetCollection( this, model );
		},

		'displayLimitError' : function ( e ) {
			utils.doDisplayLimitError( this, e );
		},

		'changeButtonAttr' : function ( e, from, to ) {
			utils.doChangeButtonAttr( this, e, from, to );
		},

		'upperFirstLetter' : function ( text ) {
			return utilsUpperFirstLetter( text );
		},

		'changeWidgetIconBtnAttr' : function ( model, from, to ) {
			utils.doChangeWidgetIconBtnAttr( this, model, from, to );
		},

		'changeSelectedNavBtn' : function ( e ) {
			utils.doChangeSelectedNavBtn( e );
		}

	} );

} );