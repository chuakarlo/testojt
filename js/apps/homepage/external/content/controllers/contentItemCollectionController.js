define( function ( require ) {
	'use strict';

	var $                          = require( 'jquery' );
	var EmptyContentCollectionView = require( 'apps/homepage/external/content/views/EmptyContentCollectionView' );

	var UIManager = require( 'apps/homepage/external/content/external/agents/UIManager' );
	var utils     = require( 'apps/homepage/external/content/utils/contentItemCollectionUtil' );

	var queueSelector      = '#your-queue-wrapper';
	var queueClass         = 'remove-from-queue';
	var toggleText         = [ 'Watch Later', 'Remove from Queue' ];

	var queueError = 'Something went wrong. Please try again later.';
	var queueInfo  = 'The content is already removed.';

	return {
		'doInitialize' : function ( view ) {
			if ( view.model ){
				var base = view.model.get('baseObject');

				base.getPreFetchLogic( base.sharedData, function ( data, callback ) {
					utils.collectionFetch( view, base, data, 0 ,function ( collection ) {
						utils.processFetchedCollection ( view, base, collection, data);
					} );
				} );
			}
		},

		'doChangeRecommendedIcons' : function ( view, queueCollection ) {
			view.itemViewOptions = function () {
				return {
					'queueCollection' : queueCollection
				};
			};
		},

		'doAddToMyQueue' : function ( view, model ) {
			model.renderToggle = function () {
				return queueClass;
			};
			$( '#content-button-' + model.ContentId ).attr( 'data-original-title', toggleText[ 1 ] );

			view.collection.add( model );
			view.$el.empty();
			view.reRenderView();

			UIManager.applyCircularScroll( queueSelector + ' ul' );
			view.options.parentView.$el.find( 'span.count' ).html( view.collection.length );
		},

		'doReRenderView' : function ( view ) {
			if ( !view.collection.length ) {
				view.emptyView = EmptyContentCollectionView;
			}
			view.render();
		},

		'doRemoveQueueByRecommended' : function ( view, recommendedItemView ) {

			if ( view.collection._byId[ recommendedItemView.model.get( 'ContentId' ) ] ) {
				view.collection._byId[ recommendedItemView.model.get( 'ContentId' ) ].destroy( {
					'dataType' : 'text',
					'success'  : function () {
						utils.removeQueueByRecommendedSuccess( view, recommendedItemView );
					},
					'error' : function () {
						utils.doError( queueError );
					}
				} );
			} else {
				utils.doInfo( queueInfo );
			}
		}
	};
} );