/**
 * UIManager
 * @class
 * Common UI manipulations across Content Section
 */
define( function ( require ) {
	'use strict';

	var ITEMS_SHOWN_PER_PANE = 4;


	var UIManager = function () {};

	function doApplyCircularScroll( container, appendToID, view, base, count ) {
		var autoRotate = false;
		require( [ 'pc-carouselSnap' ], function ( $ ) {
			var rotate = ( appendToID === 'your-queue' );
			$( container ).carouselSnap( {
				nextID: 'next-slide-' + appendToID,
				prevID: 'previous-slide-' + appendToID,
				elementsToMoveOnClick: ITEMS_SHOWN_PER_PANE,
				elementsToMoveOnHover: ITEMS_SHOWN_PER_PANE,
				startOnCenter: false,
				rotate: rotate,
				time: 10000,
				beforeShift: function () {

					if ( view.collection.length && count === view.collection.length - 1 && !autoRotate ) {
						view.$el.carouselRotate( true, function ( res, msg ) {
							autoRotate = res;
						} );
					}


				},
				afterShift: function () {},
				lastPaneEvent: function () {


					if ( view.collection.length && count !== view.collection.length - 1 ) {
						base.getCarouselCustomAction( view, view.collection, 1, base );
					}


				}
			} );
		} );
	}

	function doRemoveItemOnCarousel( container, item ) {
		require( [ 'pc-carouselSnap' ], function ( $ ) {
			$( container ).carouselRemove( item );
		} );
	}

	UIManager.prototype = {

		/**
		 * Apply circular scroll to initially fetched videos
		 * @param  {JQuery Obj} container UL element
		 */
		'applyCircularScroll': function ( container, appendToID, view, base, count ) {
			doApplyCircularScroll( container, appendToID, view, base, count );
		},

		'removeItemOnCarousel': function ( container, item ) {
			doRemoveItemOnCarousel( container, item );
		}
	};

	return new UIManager();

} );