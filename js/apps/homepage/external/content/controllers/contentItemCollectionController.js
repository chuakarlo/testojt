/*global Enumerable:false */
define( function ( require ) {
	'use strict';

	var $                          = require( 'jquery' );
	var EmptyContentCollectionView = require( 'apps/homepage/external/content/views/EmptyContentCollectionView' );

	var UIManager                  = require( 'apps/homepage/external/content/external/agents/UIManager' );
	var contentWidth               = 500;

	var queueSelector      = '#your-queue-wrapper';
	var queueClasses       = 'remove-from-queue';
	var queueCountSelector = '#your-queue-count';

	var queueError = 'Something went wrong. Please try again later.';
	var queueInfo  = 'The content is already removed.';

	function doMessage( type, message ) {
		//decide later what to do with messages
	}

	function doError ( message ) {
		doMessage( 0, message );
	}

	function doInfo ( message ) {
		doMessage( 1, message );
	}

	function removeQueueByRecommendedSuccess ( view, recommendedItemView ) {
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
	}

	function collectionFetch ( view, base, data) {
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

	function injectAttributes ( view, base, origCollection, collection, data ) {
		var id   = base._id;

		require( [ 'pc-linq' ], function () {

			var col = Enumerable.From( collection.models )
			.Select( function ( obj ) {
				obj.attributes[ 'renderToggle' ] = base.renderToggle;
				obj.attributes[ 'sharedData' ]   = data;
				return obj;
			} )
			.ToArray();
			collection.models = col;
			collection[ 'sharedData' ] = data;

			processFetchedCollection ( view, id, base, origCollection, base.getFetchLogic( collection ));
		} );
	}

	function processFetchedCollection ( view, id, base, origCollection, collection) {
		$( '#' + id + '-count' ).html( collection.count );
		view.collection = collection.collection;

		applyScroll( view, id);

		view.render();
		$( '#' + id + '-count' ).html( collection.count );
		base.getCarouselCustomAction( origCollection, view, view.$el, id );
	}

	function applyScroll ( view, id ) {

		// Check if collection is empty to render the emptyContentCollectionView
		if ( !view.collection.length ) {
			view.emptyView = EmptyContentCollectionView;
		} else {
			UIManager.applyCircularScroll( view.$el, id );
		}
	}

	return {
		'doInitialize' : function ( view ) {
			if ( view.model ){
				var base = view.model.get('baseObject');

				base.getPreFetchLogic( base.sharedData, function ( data, callback ) {
					collectionFetch( view, base, data);
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
				return queueClasses;
			};

			view.collection.add( model );
			view.$el.empty();
			view.$el.width( view.$el.width() + contentWidth );
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
						removeQueueByRecommendedSuccess( view, recommendedItemView );
					},
					'error' : function () {
						doError( queueError );
					}
				} );
			} else {
				doInfo( queueInfo );
			}
		}
	};
} );