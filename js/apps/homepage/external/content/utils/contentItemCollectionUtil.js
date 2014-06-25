/*global Enumerable:false */
define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	var EmptyContentCollectionView = require( 'apps/homepage/external/content/views/EmptyContentCollectionView' );
	var UIManager                  = require( 'apps/homepage/external/content/external/agents/UIManager' );

	var queueSelector      = '#your-queue-wrapper';
	var queueCountSelector = '#your-queue-count';

	function doMessage ( type, message ) {
		//decide later what to do with messages
	}

	function injectAttributes ( view, base, collection, data, callback ) {

		require( [ 'pc-linq' ], function () {

			var col = Enumerable.From( collection.models )
				.Select( function ( obj ) {
					obj.attributes.renderToggle = base.renderToggle;
					obj.attributes.sharedData   = data;
					return obj;
				} )
				.ToArray();
			collection.models     = col;
			collection.sharedData = data;

			callback( base.getFetchLogic ( collection ) );
		} );
	}

	function applyScroll ( view, id, base, count ) {

		// Check if collection is empty to render the emptyContentCollectionView
		if ( !view.collection.length ) {
			view.emptyView = EmptyContentCollectionView;
			view.itemViewOptions = { '_id' : view.model.get( 'id' ) };
		}
		UIManager.applyCircularScroll( view.$el, id, view, base, count );
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

			if ( view.collection.length === 0 ) {
				view.emptyView = EmptyContentCollectionView;
				view.itemViewOptions = { '_id' : view.model.get( 'id' ) };
			}
			view.render();

			if ( view.collection.length ) {
				UIManager.applyCircularScroll( queueSelector + ' ul' );
			} else {
				view.$el.css( 'width', 'auto' );
			}
		},

		'collectionFetch' : function ( view, base, data, start, callback ) {
			var collection = new( base._items )( data );

			collection.alterData( start );
			collection.fetch( {
				'success' : function ( collection, response ) {
					if ( App.request( 'homepage:isHomeRoute' ) ) {
						injectAttributes( view, base, collection, data, callback );
					}
				},
				'error'   : function ( err ) {
					App.vent.trigger( 'flash:message', {
						'message' : err.message
					} );
					view.collection = new Backbone.Collection( [ 1 ] );
					view.itemView = EmptyContentCollectionView;
					view.itemViewOptions = { '_id' : view.model.get( 'id' ) };
					view.render();
				}
			} );
		},

		'processFetchedCollection' : function ( view, base, collection, data ) {
			$( '#' + base._id + '-count' ).html( collection.count );
			view.collection = collection.collection;

			applyScroll( view, base._id, base, collection.count );

			view.render();
			base.getCarouselCustomAction( view, data );
		}

	};
} );
