define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var controller      = require( 'apps/homepage/external/content/controllers/contentItemCollectionController' );
	var App             = require( 'App' );

	require( 'apps/homepage/external/content/agents/Listener' );
	require( 'common/entities/Queue' );

	return Marionette.CollectionView.extend( {
		'events' : {
			'addToMyQueue'             : 'addToMyQueue',
			'removeQueueByRecommended' : 'removeQueueByRecommended',
			'reRenderView'             : 'reRenderView',
			'changeRecommendedIcons'   : 'changeRecommendedIcons'
		},
		'tagName'         : 'ul',
		'className'       : 'row',
		'emptyView'       : App.Common.LoadingView,
		'itemView'        : App.Common.SegmentCardsView,

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
			if ( App.request( 'homepage:isHomeRoute' ) ) {
				this.$el.find( '.content-button' ).tooltip();
			}
		}

	} );
} );
