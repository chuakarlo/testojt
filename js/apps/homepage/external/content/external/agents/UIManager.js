/**
 * UIManager
 * @class
 * Common UI manipulations across Content Section
 */
define ( function ( require ) {
	'use strict';

	var ITEMS_SHOWN_PER_PANE = 4;

	var UIManager = function () { };

	function doApplyCircularScroll ( container, appendToID ) {
		require( [ 'pc-carouselSnap' ], function( $ ) {
			$( container ).carouselSnap( {
				nextID                : 'next-slide-' + appendToID,
				prevID                : 'previous-slide-' + appendToID,
				elementsToMoveOnClick : ITEMS_SHOWN_PER_PANE,
				elementsToMoveOnHover : ITEMS_SHOWN_PER_PANE,
				startOnCenter         : true,
				time                  : 1000,
				beforeShift           : function () {},
				afterShift            : function () {}
			} );
		} );
	}

	function doRemoveItemOnCarousel ( container, item ) {
		require( [ 'pc-carouselSnap' ], function( $ ) {
			$( container ).carouselRemove( item );
		} );
	}

	UIManager.prototype = {

		/**
		 * Apply circular scroll to initially fetched videos
		 * @param  {JQuery Obj} container UL element
		 */
		'applyCircularScroll' : function ( container, appendToID ) {
			doApplyCircularScroll( container, appendToID );
		},

		'removeItemOnCarousel' : function ( container, item ) {
			doRemoveItemOnCarousel( container, item );
		}
	};

	return new UIManager();

} );