/*global Enumerable:false */
define( function ( require ) {
	'use strict';

	var $                          = require( 'jquery' );
	var EmptyContentCollectionView = require( 'apps/homepage/external/content/views/EmptyContentCollectionView' );

	var UIManager          = require( 'apps/homepage/external/content/external/agents/UIManager' );

	var queueSelector      = '#your-queue-wrapper';
	var queueCountSelector = '#your-queue-count';

	function doMessage( type, message ) {
		//decide later what to do with messages
	}

	function injectAttributes ( view, base, origCollection, collection, data ) {
		var id   = base._id;

		require( [ 'pc-linq' ], function () {

			var col = Enumerable.From( collection.models )
			.Select( function ( obj ) {
				obj.attributes.renderToggle = base.renderToggle;
				obj.attributes.sharedData   = data;
				return obj;
			} )
			.ToArray();
			collection.models = col;
			collection.sharedData = data;

			processFetchedCollection ( view, id, base, origCollection, base.getFetchLogic( collection ));
		} );
	}

	function applyScroll ( view, id ) {

		// Check if collection is empty to render the emptyContentCollectionView
		if ( !view.collection.length ) {
			view.emptyView = EmptyContentCollectionView;
		} else {
			UIManager.applyCircularScroll( view.$el, id );
		}
	}

	function processFetchedCollection ( view, id, base, origCollection, collection) {
		$( '#' + id + '-count' ).html( collection.count );
		view.collection = collection.collection;

		applyScroll( view, id);

		view.render();
		$( '#' + id + '-count' ).html( collection.count );
		base.getCarouselCustomAction( origCollection, view, view.$el, id );
	}

	return {
		'doError' : function ( message ) {
			doMessage( 0, message );
		},

		'doInfo' : function ( message ) {
			doMessage( 1, message );
		},

		'removeQueueByRecommendedSuccess' : function ( view, recommendedItemView ) {
			view.$el.empty();
			view.collection.reset( view.collection.models );
			$( queueCountSelector ).text( view.collection.length );
			$( queueSelector + ' ul li' ).trigger( 'removeQueueElements', recommendedItemView.model );

			if ( !view.collection.length ) {
				view.emptyView = EmptyContentCollectionView;
			}
			view.render();

			if ( view.collection.length ) {
				UIManager.applyCircularScroll( queueSelector + ' ul' );
			} else {
				view.$el.css( 'width', 'auto' );
			}
		},

		'collectionFetch' : function ( view, base, data) {
			var collection     = new ( base._items )( data );
			var origCollection = collection;

			collection.fetch( {
				'success' : function ( collection, response ) {
					injectAttributes ( view, base, origCollection, collection, data );
				},
				'error' : function () {
					//todo
				}
			} );
		}
	};
} );