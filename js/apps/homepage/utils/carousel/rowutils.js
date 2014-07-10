define( function ( require ) {
	'use strict';

	var $       = require( 'jquery' );
	var utils   = require( 'apps/homepage/utils/carousel/utils' );
	var navbars = require( 'apps/homepage/utils/carousel/navbars' );

	return {
		'adjustOnLastItem' : function ( $carousel ) {

			var nLeft = $carousel.find( '.item:first' ).css( 'left' );
			utils.setProjectedMove( $carousel );

			var $active = $carousel.find ( '.item.active' );
			$active = $active.next().length ? $active.next() : $active;
			$active = $active.next();

			if ( utils.isLastAndOverflow( $carousel, $active ) ) {
				nLeft = parseInt( nLeft, 10 );
				nLeft = nLeft - $carousel.data().projectedMove;
				$carousel.find( '.item' ).css( { 'left' : nLeft } ).promise().done( function () {
					navbars.showRightOnDemand( $carousel, ( nLeft * -1 ) );
					navbars.showLeftOnDemand( $carousel, nLeft );
				} );
			}
		},

		'adjustOnFirstItem' : function ( $carousel ) {

			var nLeft = $carousel.find( '.item:first' ).css( 'left' );
			var $active = $carousel.find ( '.item.active' );
			$active = $active.prev().length ? $active.prev() : $active;
			$active = $active.prev();

			if ( utils.isLastAndOverflow( $carousel, $active ) ) {
				nLeft = parseInt( nLeft, 10 );
				nLeft = $carousel.data().projectedMove + nLeft;
				nLeft = nLeft > 0 ? 0 : nLeft;
				$carousel.find( '.item' ).css( { 'left' : nLeft } ).promise().done( function () {
					navbars.showRightOnDemand( $carousel, ( nLeft * -1 ) );
					navbars.showLeftOnDemand( $carousel, nLeft );
				} );
			}
		},

		'handleOverFlowNavs' : function ( $carousel ) {
			var $active = $carousel.find ( '.item.active' );
			if ( utils.isLastAndOverflow( $carousel, $active.next() ) ) {
				$carousel.find( '.right.carousel-control' ).show();
			}
		},

		'handleLeftAdjust' : function ( event ) {
			var target    = ( event.currentTarget ) ? event.currentTarget : event.srcElement;
			var $carousel = $( target );
			var $active   = $carousel.find( '.item.active' );

			// calculate half
			var nLeft        = 0;
			var nCurrentLeft = parseInt( $active.css( 'left' ), 10 ) * -1;
			var nTotalWidth  = utils.getTotalWidth( $carousel ) * -1;

			if ( event.direction === 'left' ) {
				nLeft = ( $carousel.data().projectedMove + nCurrentLeft ) *  -1;
				nLeft = ( nLeft < nTotalWidth ) ? nTotalWidth : nLeft;
				$carousel.find( '.left.carousel-control' ).show();
			} else {
				nLeft = ( nCurrentLeft - $carousel.data().projectedMove ) * -1;
				nLeft = ( nLeft > 0 ) ? 0 : nLeft;
			}
			$carousel.data( { 'left' : nLeft } );
			$carousel.data( { 'nTotalWidth' : nTotalWidth } );
			$carousel.find( '.carousel-inner' ).css( { 'width' :  ( nTotalWidth * 3 * -1 ) + 'px' } );

			utils.animateItems( $carousel, nLeft );
		}
	};
} );
