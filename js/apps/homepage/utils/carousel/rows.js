define( function ( require ) {
	'use strict';

	var ITEM_WIDTH = 285;
	var $          = require( 'jquery' );

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
		'getLogicalRows' :function ( $carousel, nActive ) {
			var numList = $carousel.find( 'li' ).length;
			var cycle = 0;
			if ( nActive !== 1 && hasPartialSegment( $carousel ) ) {
				for ( var x = 1; x <= numList; ++x ) {
					if ( x % nActive === 0 ) {
						cycle++;
					}
				}
			} else if ( nActive === 1 ) {
				cycle = --numList;
			} else {
				cycle = $carousel.find( '.item' ).length - 1;
			}
			return cycle;
		}
	};

} );
