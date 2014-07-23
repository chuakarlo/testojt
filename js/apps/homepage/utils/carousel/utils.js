define( function ( require ) {
	'use strict';

	var ITEM_WIDTH = 285;
	var $          = require( 'jquery' );
	var rows       = require( 'apps/homepage/utils/carousel/rows' );

	function hasPartialSegment ( $carousel, bLast ) {
		var nContainer = $carousel.outerWidth();
		nContainer = nContainer ? nContainer : $( '#content-display' ).outerWidth();

		var nRow = $carousel.find( '.row:first' ).outerWidth();
		if ( bLast ) {
			nRow = $carousel.find( '.row:last' ).outerWidth();
		}

		nRow = nRow ? nRow : $carousel.find( '.item:first li' ).length * ITEM_WIDTH;
		if ( nContainer < nRow ) {
			return true;
		}
		return false;
	}

	return {
		'setLogicalRow'     : function ( $carousel ) {
			var nContainer = $carousel.outerWidth();
			nContainer = nContainer ? nContainer : $( '#content-display' ).outerWidth();

			var nActive     = Math.floor( nContainer / ITEM_WIDTH );
			var logicalRows = rows.getLogicalRows( $carousel, nActive );

			// This should probably be fixed a different way.
			// Not sure why $carousel.data() might not exist
			if ( $carousel.data() && $carousel.data().index > logicalRows ) {
				$carousel.data( { 'index' : logicalRows } );
			}

			$carousel.data( { 'total' : logicalRows } );
		},
		'getTotalWidth'     : function ( $carousel ) {
			var nTotalWidth = $carousel.find( 'li' ).length * ITEM_WIDTH;
			return nTotalWidth;
		},
		'hasPartialSegment' : function ( $carousel ) {
			return hasPartialSegment( $carousel );
		},
		'animateItems'      : function ( $carousel, nLeft ) {
			$carousel.find( '.item' ).css( { 'left' : nLeft + 'px' } );
		},
		'setProjectedMove'  : function ( $carousel ) {
			var nContainer = $carousel.outerWidth();
			nContainer     = nContainer ? nContainer : $( '#content-display' ).outerWidth();
			var nActive    = Math.floor( nContainer / ITEM_WIDTH );
			// set projected move use in navigation
			var nProjectedMove =  nActive * ITEM_WIDTH;
			$carousel.data( { 'projectedMove' : nProjectedMove } );
		}
	};
} );
