define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );

	var WidgetCollection      = require( 'apps/homepage/external/widgets/collections/WidgetCollection' );
	var utils                 = require( 'apps/homepage/external/widgets/utils/widgetCompositeUtils' );

	var iconBtnActions    = [ 'active', 'inactive' ];
	var iconBtnWithGlyphs = {
		'active'   : iconBtnActions[ 0 ] + ' fa fa-minus',
		'inactive' : iconBtnActions[ 1 ] + ' fa fa-plus'
	};
	var btnActions       = [ 'save', 'remove' ];

	var widgetDisplayLimit = 3;
	var messages      = {
		'widgetLimitError' : 'You have reached the amount of widgets to be displayed on your homepage?'
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
			view.ui.widgetPreview.html( view.widgetPreviewItemView.render().el );
		},

		'doGetActiveWidgets' : function ( view ){
			return utils.doGetWidgets( view, true );
		},

		'doGetInactiveWidgets' : function ( view ) {
			return utils.doGetWidgets( view, false );
		},

		'doGetModelByClickEvent' : function ( view, e ) {
			var widgetId    = $( e.currentTarget ).attr( 'data-id' );
			return view.collection.get( widgetId );
		},

		'doActivateWidget' : function ( view, e ) {
			var handle = utils.doActivateWidgetCheck[ view.options.userWidgetCollection.length < widgetDisplayLimit ];
			handle( view, e );
		},

		'doDeactivateWidget' : function ( view, e ) {
			var widgetModel = view.getModelByClickEvent( e );

			view.removeToWidgetCollection( widgetModel );
			view.changeButtonAttr( e, btnActions[ 1 ], btnActions[ 0 ] );
			view.changeWidgetIconBtnAttr( widgetModel, iconBtnActions[ 0 ], iconBtnActions[ 1 ] );
		},

		'doAddToWidgetCollection' : function ( view, model ) {
			utils.doProcessWidgetCollection( view, model.attributes, 'add' );
		},

		'doRemoveToWidgetCollection' : function ( view, model ) {
			utils.doProcessWidgetCollection( view, model, 'remove' );
		},

		'doDisplayLimitError' : function ( view, e ) {
			view.showWidgetPreview( e );
			view.widgetPreviewItemView.ui.widgetMessage.html( messages.widgetLimitError ).show();
		},

		'doChangeButtonAttr' : function ( view, e , from, to ) {
			var parent = $( e.currentTarget ).parent();

			utils.changeButtonAttr( view, parent, from, to, [ '', '' ] );
			utils.changeButtonAttr( view, parent, from + '-and-close', to, [ '-and-close', ' & Close' ] );
		},

		'doChangeWidgetIconBtnAttr' : function ( view, model, from, to ) {
			view.$el.find( '.widget-icon-btn[ data-id="'+ model.get( 'WidgetId' ) + '" ]' )
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