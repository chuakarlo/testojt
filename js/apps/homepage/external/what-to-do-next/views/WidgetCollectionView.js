/**
 *
 * Notes:
 * Delete Buttons manipulations should be done here.
 */
define( function ( require ) {
	'use strict';

	var Marionette          = require( 'marionette' );
	var WidgetCollection    = require( 'apps/homepage/external/what-to-do-next/collections/WidgetCollection' );
	var WidgetCompositeView = require( 'apps/homepage/external/what-to-do-next/views/WidgetCompositeView' );
	var $                   = require( 'jquery' );

	//agents
	var UIManager        = require( 'apps/homepage/external/what-to-do-next/agents/UIManager' );
	var WidgetUtility    = require( 'apps/homepage/external/what-to-do-next/agents/WidgetUtility' );
	var ApiCollection    = require( 'apps/homepage/external/what-to-do-next/agents/WidgetAPI' );
	var parentCollection = null;

	function afterSaveWidgetPanes ( that, active, inactive ) {

		var thisElement  = that.$el;
		//should be updating active and inactive panes
		var sortedModels = WidgetUtility.sortWidgetsById( active );
		$( '#active-widgets ul').empty();
		$( '#inactive-widgets ul').empty();
		that.collection.reset( sortedModels );

		var inactiveView = that.inactive.currentView;
		sortedModels     = WidgetUtility.sortWidgetsById( inactive );
		inactiveView.collection.reset( sortedModels );

		//try to enable dragging
		UIManager.enableDrag( thisElement );

		UIManager.manageDeleteButtons( that.$el, that.collection.length );
	}

	return Marionette.CollectionView.extend( {
		'initialize' : function ( options ) {

			if( !this.collection ) {
				return;
			}

			var that        = this;
			// var thisElement = this.$el;
			this.inactive   = options.inactive;

			//set base collection pointing to parent layout collection
			ApiCollection.setBaseCollection( this.collection );

			//save reference of parent collection
			parentCollection = this.collection;

			//point to this collection to other collection object so that
			//parent collection will not be manipulated or reset
			this.collection  = new WidgetCollection();
			this.collection['sharedData'] = parentCollection.sharedData;

			ApiCollection.getActiveCollection ( function ( collection ) {
					//reset collection to filtered active collection
					var sortedModels = WidgetUtility.sortWidgetsById( collection );

					that.collection.reset( sortedModels );
					//in case fetching of API is slow and user already clicked Widget Btn
					if( UIManager.isWidgetBtnActive() ) {
						UIManager.showDeleteButtons( that.$el.children() );
					}
			} );

			//call at init only for one-time execution
			// require( [ 'jqueryui' ], function ( $ ) {
			// 	$(thisElement).sortable ( {
			// 		'helper'      : 'clone',
			// 		'appendTo'    : '#active-holder',
			// 		'placeholder' : 'ui-state-highlight',
			// 		'zIndex'      : 10000,

			// 		/* event triggered when you start dragging */
			// 		'start'       : function ( event, ui ) {

			// 			//adjust active pane width so that pane will only be shown
			// 			//as one row of widgets
			// 			UIManager.updateWidgetPaneWidth( $( '#inactive-widgets > ul' ), 1 );
			// 		},
			// 		/* event triggered when an item is removed in the pane*/
			// 		'remove'      :  function ( event, ui ) {

			// 			var sId   = UIManager.getWidgetId( ui );
			// 			var model = parentCollection.get( sId );

			// 			//remove and fetch new collections
			// 			WidgetUtility.widgetCollectionRemoveAndFetch( model, that.collection, function ( active, inactive ) {
			// 				afterSaveWidgetPanes( that, active, inactive );
			// 			} );

			// 		},
			// 		/* event triggered when an item is added in the pane */
			// 		'receive'     :  function ( event, ui ) {

			// 			var sId   = UIManager.getWidgetId( ui );
			// 			var model = parentCollection.get( sId );

			// 			WidgetUtility.widgetCollectionAddAndFetch( model, that.collection, function ( active, inactive ) {
			// 				afterSaveWidgetPanes( that, active, inactive );
			// 			} );

			// 		}
			// 	} );
			// } );

		},
		'events'       : {
			'click .delete-widget' : 'deleteWidget',
		},
		'deleteWidget' : function ( evt ) {

			var that  = this;
			var sId   = $( evt.currentTarget ).parent().attr( 'id' );
			var model = parentCollection.get ( sId );


			//remove and fetch new collections
			WidgetUtility.widgetCollectionRemoveAndFetch( model, that.collection, function ( active, inactive ) {
					afterSaveWidgetPanes( that, active, inactive );
			} );

		},
		'tagName'      : 'ul',
		'className'    : 'row',
		'itemView'     : WidgetCompositeView,
		'onRender'     : function ( parent ) {

			if ( parent.$el.children().length === 0 ) {
				return;
			}
			UIManager.applyCircularScroll( parent.$el, parent.$el.parent().attr('id') );
		}

	} );

} );