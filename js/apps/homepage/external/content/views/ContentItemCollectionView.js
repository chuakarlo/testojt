define( function ( require ) {
	'use strict';

	var Marionette       = require( 'marionette' );
	var LoadingView          = require('common/views/LoadingView');
	var ContentItemView  = require( 'apps/homepage/external/content/views/ContentItemView' );
	var controller       = require( 'apps/homepage/external/content/controllers/contentItemCollectionController' );

	return Marionette.CollectionView.extend( {
		'events' : {
			'addToMyQueue'             : 'addToMyQueue',
			'removeQueueByRecommended' : 'removeQueueByRecommended',
			'reRenderView'             : 'reRenderView',
			'changeRecommendedIcons'   : 'changeRecommendedIcons'
		},
		'tagName'         : 'ul',
		'className'       : 'row',
		'emptyView'       : LoadingView,
		'itemView'        : ContentItemView,

		'initialize' : function () {
			controller.doInitialize( this );
		},

		'changeRecommendedIcons' : function ( event, queueCollection ) {
			controller.doChangeRecommendedIcons( this, queueCollection );
		},

		'addToMyQueue' : function ( event, model ) {
			controller.doAddToMyQueue( this, model );
		},

		'removeQueueByRecommended' : function ( event, recommendedItemView ) {
			controller.doRemoveQueueByRecommended( this, recommendedItemView );
		},

		'reRenderView' : function () {
			controller.doReRenderView( this );
		},

		'onRender' : function () {
			this.$el.find( '.content-button' ).tooltip();
		}

	} );
} );
