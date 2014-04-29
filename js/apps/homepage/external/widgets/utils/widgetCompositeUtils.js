define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );

	var WidgetPreviewItemView = require( 'apps/homepage/external/widgets/views/WidgetPreviewItemView' );

	var iconBtnActions = [ 'active', 'inactive' ];
	var btnActions     = [ 'save', 'remove' ];

	function fetchingModels ( personnelId, widgetIds ) {
		return {
			'path'   : 'com.schoolimprovement.pd360.dao.core.WidgetGateway',
			'method' : 'addWidgetsByPersonnelId',
			'args'   : {
				'personnelId' : personnelId,
				'widgetIds'   : widgetIds
			}
		};
	}

	function doUpdateUserWidgets ( personnelId, widgetIds ) {
		$.when( Remoting.fetch( fetchingModels( personnelId, widgetIds ) ) ).done( function ( ) {
			//do something
		} );
	}

	function pushWidgetIds ( userWidgets ) {
		var widgetIds = [ ];
		for ( var index in userWidgets ) {
			widgetIds.push( userWidgets[ index ].get( 'WidgetId' ) );
		}
		return widgetIds;
	}

	return {

		'doShow' : function ( collection, view, e ) {
			view.collection = collection;
			view.render();
			view.changeSelectedNavBtn( e );
		},

		'changeButtonAttr' : function ( view, parent, btnClassName, to, extra ) {
			var singleActionBtn = parent.find( '.' + btnClassName );
			singleActionBtn.removeClass( btnClassName ).addClass( to + extra[ 0 ] );
			singleActionBtn.text( view.upperFirstLetter( to ) + extra[ 1 ] );
		},

		'newPreviewItem' : function ( view, e ) {
			var widgetModel = view.getModelByClickEvent( e );
			return  new WidgetPreviewItemView( {
				'model'                : widgetModel,
				'userWidgetCollection' : view.options.userWidgetCollection
			} );
		},

		'doProcessWidgetCollection' : function ( view, model, mode ) {
			view.options.userWidgetCollection[ mode ]( model );
			var userWidgets = view.options.userWidgetCollection.models;
			var widgetIds   = pushWidgetIds( userWidgets );
			doUpdateUserWidgets( Session.personnelId(), widgetIds );
		},

		'doActivateWidgetCheck' : {
			true : function ( view, e ) {
				var widgetModel = view.getModelByClickEvent( e );
				view.addToWidgetCollection( widgetModel );
				view.changeButtonAttr( e, btnActions[ 0 ], btnActions[ 1 ] );
				view.changeWidgetIconBtnAttr( widgetModel, iconBtnActions[ 1 ], iconBtnActions[ 0 ] );
			},
			false : function ( view, e ) {
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