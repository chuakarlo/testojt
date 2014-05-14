define( function ( require ) {
	'use strict';

	var $ = require( 'jquery' );

	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );

	var WidgetPreviewItemView = require( 'apps/homepage/external/widgets/views/WidgetPreviewItemView' );

	var iconBtnActions = [ 'active', 'inactive' ];
	var btnActions     = [ 'save', 'remove' ];

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
				'message' : 'An error occurred. Please try again later.'
			} );

		} );
	};

	var pushWidgetIds = function ( userWidgets ) {
		var widgetIds = [ ];
		for ( var index in userWidgets ) {
			widgetIds.push( userWidgets[ index ].get( 'WidgetId' ) );
		}
		return widgetIds;
	};

	return {

		'doShow' : function ( collection, view, e ) {
			var widgetHeaderId = $( e.currentTarget ).attr( 'id' );

			view.collection = collection;
			view.render();
			view.$el.find( 'li.selected' ).removeClass( 'selected' );
			view.$el.find( '#' + widgetHeaderId ).addClass( 'selected' );
		},

		'changeButtonAttr' : function ( view, btn, btnClassName, to, extra ) {
			var previewBtnUI = view.widgetPreviewItemView.ui;

			btn.removeClass( btnClassName ).addClass( to + extra[ 0 ] );
			previewBtnUI.actionBtn.text( view.upperFirstLetter( to ) );
			previewBtnUI.actionCloseBtn.text( view.upperFirstLetter( to ) + extra[ 1 ] );
		},

		'newPreviewItem' : function ( view, e ) {
			var widgetModel = view.getModelByClickEvent( e );

			if ( widgetModel ) {
				return new WidgetPreviewItemView( {
					'model'                : widgetModel,
					'userWidgetCollection' : view.options.userWidgetCollection
				} );
			}
		},

		'doProcessWidgetCollection' : function ( view, model, mode ) {
			view.options.userWidgetCollection[ mode ]( model );
			var userWidgets = view.options.userWidgetCollection.models;
			var widgetIds   = pushWidgetIds( userWidgets );
			doUpdateUserWidgets( Session.personnelId(), widgetIds );
		},

		'doActivateWidgetCheck' : {
			'true'  : function ( view, e ) {
				var widgetModel         = view.getModelByClickEvent( e );
				var widgetCurrentTab    = view.$el.find( 'li.selected' ).attr( 'id' );
				var hasRemoveCloseClass = $( e.currentTarget ).hasClass( 'save-and-close' );

				view.hidePreviewErrorMsg( e );
				view.addToWidgetCollection( widgetModel );
				view.$el.find( '#widget-settings-header li#' + widgetCurrentTab ).trigger( 'click' );

				view.changeWidgetSelectedTab( widgetCurrentTab );
				if ( view.onTab( 'all' ) ) {
					view.showWidgetPreview( e );
					view.changeButtonAttr( e, btnActions[ 0 ], btnActions[ 1 ] );
					view.changeWidgetIconBtnAttr( widgetModel, iconBtnActions[ 1 ], iconBtnActions[ 0 ] );
				}
				if ( hasRemoveCloseClass ) {
					view.closeWidgetPanel();
				}
				view.showWidgetPlaceholder();
			},
			'false' : function ( view, e ) {
				view.showWidgetPreview( e );
				view.displayLimitError( e );
			}
		},

		'doGetWidgets' : function ( view, state ) {
			return view.options.widgetCollection.filter( function ( model ) {
				var data = view.options.userWidgetCollection.get( model.get( 'WidgetId' ) );
				return ( typeof data !== 'undefined' ) === state;
			} );
		}
	};

} );
