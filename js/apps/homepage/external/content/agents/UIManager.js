/**
 * UIManager
 * @class
 * Common UI manipulations across Content Section
 */
define ( function ( require ) {
	'use strict';

	var ITEMS_SHOWN_PER_PANE = 4;
	var $                    = require( 'jquery' );

	var UIManager = function () { };

	UIManager.prototype = {

		/**
		 * Apply circular scroll to initially fetched videos
		 * @param  {JQuery Obj} container UL element
		 */
		'applyCircularScroll' : function ( container, appendToID, view, base ) {


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
		},

		'removeItemOnCarousel' : function ( container, item ) {
			require( [ 'pc-carouselSnap' ], function( $ ) {
				$( container ).carouselRemove( item );
			} );
		},
		'setContentCount' : function ( id, count ) {
			$( '#' + id + '-count' ).html( count );
		}

	};

	return new UIManager();

} );

