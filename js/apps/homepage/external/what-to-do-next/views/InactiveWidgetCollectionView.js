define( function ( require ) {
	'use strict';

	var Marionette                 = require( 'marionette' );
	var InactiveItemCollectionView = require( 'apps/homepage/external/what-to-do-next/views/InactiveItemCollectionView' );
	var WidgetCollection           = require( 'apps/homepage/external/what-to-do-next/collections/WidgetCollection' );

	//agents
	var UIManager           = require( 'apps/homepage/external/what-to-do-next/agents/UIManager' );
	var WidgetUtility       = require( 'apps/homepage/external/what-to-do-next/agents/WidgetUtility' );
	var ApiCollection       = require( 'apps/homepage/external/what-to-do-next/agents/WidgetAPI' );

	var parentCollection    = null;

	return Marionette.CollectionView.extend( {
		'initialize' : function ( options ) {
			var that        = this;
			// var thisElement = this.$el;

			//set base collection pointing to parent layout collection
			ApiCollection.setBaseCollection ( this.collection );

			//save reference of parent collection
			parentCollection = this.collection;

			//point to this collection to other collection object so that
			//parent collection will not be manipulated or reset
			this.collection  = new WidgetCollection();

			ApiCollection.getInactiveCollection ( function ( collection ) {
					//reset collection to filtered inactive collection
					var sortedModels = WidgetUtility.sortWidgetsById( collection );
					that.collection.reset (  sortedModels  );
			} );

			//call at init only for one-time execution
			// require( [ 'jqueryui' ], function ( $ ) {
			// 	$(thisElement).sortable ( {
			// 		'helper'      : 'clone',
			// 		'appendTo'    : '#inactive-holder',
			// 		'placeholder' : 'ui-state-highlight',
			// 		'zIndex'      : 10000,
			// 		'connectWith' : '#active-widgets .three-box',

			// 		/* event triggered when you start dragging */
			// 		'start'       : function ( event, ui ) {

			// 			//adjust active pane width so that pane will only be shown
			// 			//as one row of widgets
			// 		}
			// 	} );
			// } );

		},
		'tagName'         : 'ul',
		'className'       : 'three-box',

		/**
		 * We create another CollectionView we call ItemCollectionView
		 * to wrap our different item views,
		 * as CollectionView can only refer to one type of ItemView object.
		 * In this case we needed to have different types of ItemView
		 */
		'itemView'        : InactiveItemCollectionView,

		'onRender' : function ( parent ) {
			if( parent.$el.children().length === 0 ){
				return;
			}
			UIManager.applyCircularScroll( parent.$el, parent.$el.parent().attr('id') );
		}

	} );

} );