define( function ( require ) {
	'use strict';

	var $   = require( 'jquery' );
	var App = require( 'App' );

	var WidgetCollection        = require( 'apps/homepage/external/widgets/collections/WidgetCollection' );
	var EmptyUserWidgetItemView = require( 'apps/homepage/external/widgets/views/EmptyUserWidgetItemView' );
	var utils                   = require( 'apps/homepage/external/widgets/utils/widgetCompositeUtils' );

	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );

	var Utils = App.Homepage.Utils;

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

	var fetchingModels = function ( personnelId, widgetIds ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.core.WidgetGateway',
			'method' : 'addWidgetsByPersonnelId',
			'args'   : {
				'personnelId' : personnelId,
				'widgetIds'   : widgetIds
			}
		};
	};

	var doUpdateUserWidgets = function ( personnelId, widgetIds ) {
		App.when( Remoting.fetch( fetchingModels( personnelId, widgetIds ) ) ).done( function ( ) {
			//do something
		} ).fail( function ( error ) {

			App.vent.trigger( 'flash:message', {
				'message' : Utils.message.err
			} );

		} );
	};

	function pushWidgetIds ( userWidgets ) {
		var widgetIds = [ ];
		for ( var index in userWidgets ) {
			widgetIds.push( userWidgets[ index ].get( 'WidgetId' ) );
		}
		return widgetIds;
	}

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

		'doResetAll' : function ( view ) {
			view.options.userWidgetCollection.reset();

			view.options.actualUserWidgetCollection.models.forEach( function ( model ) {
				view.options.userWidgetCollection.add( model );
			} );
		},

		'doSaveAll' : function ( view ) {
			view.options.actualUserWidgetCollection.reset();

			$( '.active-widgets-container' ).html( '' );

			view.options.userWidgetCollection.models.forEach( function ( model ) {
				view.options.actualUserWidgetCollection.add( model );
			} );

			var count = 3 - view.options.actualUserWidgetCollection.length;

			for ( var i = 0; i < count; i ++ ) {
				var emptyUserWidgetItemView = new EmptyUserWidgetItemView();
				$( '.active-widgets-container' ).append( emptyUserWidgetItemView.render().el );
			}

			var userWidgets = view.options.actualUserWidgetCollection.models;
			var widgetIds   = pushWidgetIds( userWidgets );
			doUpdateUserWidgets( Session.personnelId(), widgetIds );
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
				var hasRemoveCloseClass   = $( e.currentTarget ).hasClass( 'remove-and-close' );

				view.removeToWidgetCollection( widgetModel );
				view.$el.find( '#widget-settings-header li#' + widgetCurrentTab ).trigger( 'click' );

				view.changeWidgetSelectedTab( widgetCurrentTab );
				if ( view.onTab( 'all' ) ) {
					view.showWidgetPreview( e );
					view.changeButtonAttr( btnActions[ 1 ], btnActions[ 0 ] );
					view.changeWidgetIconBtnAttr( widgetModelId, iconBtnActions[ 0 ], iconBtnActions[ 1 ] );
					view.hidePreviewErrorMsg( e );
				}

				if ( hasRemoveCloseClass ) {
					view.closeWidgetPanel();
				}

			} else {
				view.showWidgetPreview( e );
				App.vent.trigger( 'flash:message', {
					'message' : App.Homepage.Utils.message.widgetMinError,
					'type'    : 'error'
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
