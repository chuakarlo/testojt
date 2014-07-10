define( function ( require ) {
	'use strict';

	var ITEM_WIDTH = 285;
	var $          = require( 'jquery' );

	function hasPartialSegment ( $carousel ) {
		var nContainer = $carousel.outerWidth();
		nContainer = nContainer ? nContainer : $( '#content-display' ).outerWidth();

		var nRow = $carousel.find( '.row:first' ).outerWidth();
		nRow = nRow ? nRow : $carousel.find( 'li' ).length * ITEM_WIDTH;

		if ( nContainer < nRow ) {
			return true;
		}
		return false;
	}

	return {
		'getTotalWidth'     : function ( $carousel ) {
			var nTotalWidth = $carousel.find( 'li' ).length * ITEM_WIDTH;
			return nTotalWidth;
		},
		'getTotalExcess'    : function ( $carousel ) {
			var nOverRun = 0;
			if ( hasPartialSegment( $carousel ) ) {
				nOverRun = ( $carousel.find( '.item' ).length - 1 ) % $carousel.data().size;
			}
			return nOverRun;
		},
		'hasPartialSegment' : function ( $carousel ) {
			return hasPartialSegment( $carousel );
		},
		'animateItems'      : function ( $carousel, nLeft ) {
			$carousel.find( '.item' ).css( { 'left' : nLeft + 'px' } );
		},
		'setProjectedMove'  : function ( $carousel ) {
			// Calculate  Projected Move
			var nSize = $carousel.data().size;
			nSize = hasPartialSegment( $carousel ) ? --nSize : nSize;

			// set projected move use in navigation
			var nProjectedMove =  nSize * ITEM_WIDTH;
			$carousel.data( { 'projectedMove' : nProjectedMove } );
		},
		'isLastAndOverflow' : function ( $carousel, $active ) {
			if ( !$active.length && hasPartialSegment( $carousel ) ) {
				return true;
			}
			return false;
		}
	};
} );
