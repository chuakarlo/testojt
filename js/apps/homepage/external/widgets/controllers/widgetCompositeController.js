define( function ( require ) {
	'use strict';

	var $   = require( 'jquery' );
	var App = require( 'App' );

	var WidgetCollection      = require( 'apps/homepage/external/widgets/collections/WidgetCollection' );
	var utils                 = require( 'apps/homepage/external/widgets/utils/widgetCompositeUtils' );

	var iconBtnActions    = [ 'active', 'inactive' ];
	var iconBtnWithGlyphs = {
		'active'   : iconBtnActions[ 0 ] + ' fa fa-minus',
		'inactive' : iconBtnActions[ 1 ] + ' fa fa-plus'
	};
	var btnActions       = [ 'save', 'remove' ];

	var widgetDisplayLimit = 3;

	function closeMessage () {
		var err = $( '.flash-close' );
		if ( err ) {
			err.click();
		}
	}

	var messages           = {
		'widgetLimitError' : 'You have reached the amount of widgets to be displayed on your homepage.',
		'widgetMinError'   : 'Action not allowed. You must have at least one active widget'
	};

	return {
		'doShowAllWidgets' : function ( view, e ) {
			utils.doShow( view.options.widgetCollection, view, e );
		},

		'doShowActiveWidgets' : function ( view, e ) {
			utils.doShow( new WidgetCollection( view.getActiveWidgets() ), view, e );
		},

		'doShowInactiveWidgets' : function ( view, e ) {
			utils.doShow( new WidgetCollection( view.getInactiveWidgets() ), view, e );
		},

		'doShowWidgetPreview' : function ( view, e ) {
			view.widgetPreviewItemView = utils.newPreviewItem( view, e );
			if ( view.widgetPreviewItemView ) {
				view.ui.widgetPreview.html( view.widgetPreviewItemView.render().el );
				closeMessage();
			}
		},

		'doGetActiveWidgets' : function ( view ) {
			return utils.doGetWidgets( view, true );
		},

		'doGetInactiveWidgets' : function ( view ) {
			return utils.doGetWidgets( view, false );
		},

		'doGetModelByClickEvent' : function ( view, e ) {
			var widgetId = $( e.currentTarget ).attr( 'data-id' );
			return view.collection.get( widgetId );
		},

		'doActivateWidget' : function ( view, e ) {
			var handle = utils.doActivateWidgetCheck[ view.options.userWidgetCollection.length < widgetDisplayLimit ];
			handle( view, e );
		},

		'doDeactivateWidget' : function ( view, e ) {
			if ( view.options.userWidgetCollection.length !== 1 ) {
				var widgetModel      = view.getModelByClickEvent( e );
				var widgetModelId    = widgetModel.id;
				var widgetCurrentTab = view.$el.find( 'li.selected' ).attr( 'id' );

				view.removeToWidgetCollection( widgetModel );
				view.$el.find( '#widget-settings-header li#' + widgetCurrentTab ).trigger( 'click' );

				view.changeWidgetSelectedTab( widgetCurrentTab );
				if ( view.onTab( 'all' ) ) {
					view.changeButtonAttr( btnActions[ 1 ], btnActions[ 0 ] );
					view.changeWidgetIconBtnAttr( widgetModelId, iconBtnActions[ 0 ], iconBtnActions[ 1 ] );
					view.showWidgetPreview( e );
					view.hidePreviewErrorMsg( e );
				}
			} else {
				view.showWidgetPreview( e );
				App.vent.trigger( 'flash:message', {
					'message' : messages.widgetMinError
				} );
			}
		},

		'doAddToWidgetCollection' : function ( view, model ) {
			utils.doProcessWidgetCollection( view, model.attributes, 'add' );
		},

		'doRemoveToWidgetCollection' : function ( view, model ) {
			utils.doProcessWidgetCollection( view, model, 'remove' );
		},

		'doHidePreviewErrorMsg' : function ( view, e ) {
			view.showWidgetPreview( e );
			closeMessage();
		},

		'doChangeButtonAttr' : function ( view, from, to ) {
			var previewBtnUI = view.widgetPreviewItemView.ui;

			utils.changeButtonAttr( view, previewBtnUI.actionBtn, from, to, [ '', '' ] );
			utils.changeButtonAttr( view, previewBtnUI.actionCloseBtn, from + '-and-close', to, [ '-and-close', ' & Close' ] );
		},

		'doChangeWidgetIconBtnAttr' : function ( view, widgetModelId, from, to ) {
			view.$el.find( '.widget-icon-btn[ data-id="' + widgetModelId + '" ]' )
			.removeClass( iconBtnWithGlyphs[ from ] )
			.addClass( iconBtnWithGlyphs[ to ] );
		},

		'doChangeSelectedNavBtn' : function ( e ) {
			var currentBtn  = $( e.currentTarget );
			var selectedBtn = currentBtn.closest( 'li[ class="selected" ]' );
			selectedBtn.removeClass( 'selected' );
			currentBtn.addClass( 'selected' );
		}
	};

} );
