define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Session    = require( 'Session' );

	var Remoting = require( 'Remoting' );

	var WidgetCollection      = require( 'apps/homepage/external/widgets/collections/WidgetCollection' );
	var WidgetCompositeView   = require( 'apps/homepage/external/widgets/views/WidgetItemView' );
	var WidgetPreviewItemView = require( 'apps/homepage/external/widgets/views/WidgetPreviewItemView' );
	var template              = require( 'text!apps/homepage/external/widgets/templates/widgetCompositeView.html' );

	var iconBtnActions    = [ 'active', 'inactive' ];
	var iconBtnGlyphs     = [ 'fa fa-plus', 'fa fa-minus' ];
	var iconBtnWithGlyphs = {
		'active'   : iconBtnActions[ 0 ] + ' ' + iconBtnGlyphs[ 1 ],
		'inactive' : iconBtnActions[ 1 ] + ' ' + iconBtnGlyphs[ 0 ]
	};
	var btnActions       = [ 'save', 'remove' ];

	var widgetDisplayLimit = 3;
	var messages      = {
		'widgetLimitError' : 'You have reached the amount of widgets to be displayed on your homepage?'
	};

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

	function doUpdateUserWidgets( personnelId, widgetIds ) {
		$.when( Remoting.fetch( fetchingModels( personnelId, widgetIds ) ) ).done( function ( ) {
			//do something
		} );
	}

	function doShowAllWidgets ( view, e ) {
		view.collection = view.options.widgetCollection;
		view.render();

		view.changeSelectedNavBtn( e );
	}

	function doShowActiveWidgets ( view, e ) {
		view.collection = new WidgetCollection( view.getActiveWidgets() );
		view.render();

		view.changeSelectedNavBtn( e );
	}

	function doShowInactiveWidgets ( view, e ) {
		view.collection = new WidgetCollection( view.getInactiveWidgets() );
		view.render();

		view.changeSelectedNavBtn( e );
	}

	function doShowWidgetPreview ( view, e ) {
		var widgetModel            = view.getModelByClickEvent( e );
		view.widgetPreviewItemView = new WidgetPreviewItemView( {
			'model'                : widgetModel,
			'userWidgetCollection' : view.options.userWidgetCollection
		} );
		view.ui.widgetPreview.html( view.widgetPreviewItemView.render().el );
	}

	function doGetActiveWidgets ( view ){
		return view.options.widgetCollection.filter( function ( model ) {
			return view.options.userWidgetCollection.get( model.get( 'WidgetId' ) );
		} );
	}

	function doGetInactiveWidgets ( view ) {
		return view.options.widgetCollection.filter( function ( model ) {
			return !view.options.userWidgetCollection.get( model.get( 'WidgetId' ) );
		} );
	}

	function doGetModelByClickEvent ( view, e ) {
		var widgetId    = $( e.currentTarget ).attr( 'data-id' );
		return view.collection.get( widgetId );
	}

	function doActivateWidget ( view, e ) {
		var widgetModel = view.getModelByClickEvent( e );

		if ( view.options.userWidgetCollection.length < widgetDisplayLimit ) {
			view.addToWidgetCollection( widgetModel );
			view.changeButtonAttr( e, btnActions[ 0 ], btnActions[ 1 ] );
			view.changeWidgetIconBtnAttr( widgetModel, iconBtnActions[ 1 ], iconBtnActions[ 0 ] );
		} else {
			view.displayLimitError( e );
		}
	}

	function doDeactivateWidget ( view, e ) {
		var widgetModel = view.getModelByClickEvent( e );

		view.removeToWidgetCollection( widgetModel );
		view.changeButtonAttr( e, btnActions[ 1 ], btnActions[ 0 ] );
		view.changeWidgetIconBtnAttr( widgetModel, iconBtnActions[ 0 ], iconBtnActions[ 1 ] );
	}

	function doAddToWidgetCollection ( view, model ) {
		view.options.userWidgetCollection.add( model.attributes );
		var userWidgets = view.options.userWidgetCollection.models;
		var widgetIds = [ ];
		for ( var index in userWidgets ) {
			widgetIds.push( userWidgets[ index ].get( 'WidgetId' ) );
		}
		doUpdateUserWidgets( Session.personnelId(), widgetIds );
	}

	function doRemoveToWidgetCollection ( view, model ) {
		view.options.userWidgetCollection.remove( model );
		var userWidgets = view.options.userWidgetCollection.models;
		var widgetIds = [ ];
		for ( var index in userWidgets ) {
			widgetIds.push( userWidgets[ index ].get( 'WidgetId' ) );
		}
		doUpdateUserWidgets( Session.personnelId(), widgetIds );
	}

	function doDisplayLimitError ( view, e ) {
		view.showWidgetPreview( e );
		view.widgetPreviewItemView.ui.widgetMessage.html( messages.widgetLimitError ).show();
	}

	function doChangeButtonAttr ( view, e , from, to ) {
		var parent            = $( e.currentTarget ).parent();
		var btnClassName      = from;
		var btnCloseClassName = from + '-and-close';
		var singleActionBtn   = parent.find( '.' + btnClassName );
		var doubleActionBtn   = parent.find( '.' + btnCloseClassName );

		singleActionBtn.removeClass( btnClassName ).addClass( to );
		doubleActionBtn.removeClass( btnCloseClassName ).addClass( to + '-and-close' );

		singleActionBtn.text( view.upperFirstLetter( to ) );
		doubleActionBtn.text( view.upperFirstLetter( to ) + ' & Close' );
	}

	function doUpperFirstLetter ( text ) {
		return text.toLowerCase().replace( /\b[a-z]/g, function ( letter ) {
			return letter.toUpperCase();
		} );
	}

	function doChangeWidgetIconBtnAttr ( view, model, from, to ) {
		view.$el.find( '.widget-icon-btn[ data-id="'+ model.get( 'WidgetId' ) + '" ]' )
		.removeClass( iconBtnWithGlyphs[ from ] )
		.addClass( iconBtnWithGlyphs[ to ] );
	}

	function doChangeSelectedNavBtn ( e ) {
		var currentBtn  = $( e.currentTarget );
		var selectedBtn = currentBtn.closest( 'li[ class="selected" ]' );
		selectedBtn.removeClass( 'selected' );
		currentBtn.addClass( 'selected' );
	}

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
			doShowAllWidgets( this, e );
		},

		'showActiveWidgets' : function ( e ) {
			doShowActiveWidgets( this, e );
		},

		'showInactiveWidgets' : function ( e ) {
			doShowInactiveWidgets( this, e );
		},

		'showWidgetPreview' : function ( e ) {
			doShowWidgetPreview( this, e );
		},

		'getActiveWidgets' : function () {
			return doGetActiveWidgets( this );
		},

		'getInactiveWidgets' : function () {
			return doGetInactiveWidgets( this );
		},

		'getModelByClickEvent' : function ( e ) {
			return doGetModelByClickEvent( this, e );
		},

		'activateWidget' : function ( e ) {
			doActivateWidget( this, e );
		},

		'deactivateWidget' : function ( e ) {
			doDeactivateWidget( this, e );
		},

		'addToWidgetCollection' : function ( model ) {
			doAddToWidgetCollection( this, model );
		},

		'removeToWidgetCollection' : function ( model ) {
			doRemoveToWidgetCollection( this, model );
		},

		'displayLimitError' : function ( e ) {
			doDisplayLimitError( this, e );
		},

		'changeButtonAttr' : function ( e, from, to ) {
			doChangeButtonAttr( this, e, from, to );
		},

		'upperFirstLetter' : function ( text ) {
			return doUpperFirstLetter( text );
		},

		'changeWidgetIconBtnAttr' : function ( model, from, to ) {
			doChangeWidgetIconBtnAttr( this, model, from, to );
		},

		'changeSelectedNavBtn' : function ( e ) {
			doChangeSelectedNavBtn( e );
		}

	} );

} );