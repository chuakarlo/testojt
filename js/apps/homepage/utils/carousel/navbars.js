define( function ( require ) {
	'use strict';

	var utils = require( 'apps/homepage/utils/carousel/utils' );

	function handleRightNav ( $carousel, $rightControl, $active, options ) {

		$carousel.data( { 'stopSwipeRight' : false } );
		if ( !$active.next().length )  {
			$rightControl.hide();
			$carousel.data( { 'stopSwipeRight' : true } );
			$carousel.data().onLastNav();
		} else {
			$rightControl.show();
		}
	}

	function handleLeftNav ( $carousel, $active, $leftControl ) {
		// if the first slide
		$carousel.data( { 'stopSwipeLeft' : false } );
		if ( !$active.prev().length )  {
			$leftControl.hide();
			$carousel.data( { 'stopSwipeLeft' : true } );
		} else {
			$leftControl.show();
		}
	}

	return {
		'handleOverFlowNavs' : function ( $carousel ) {
			var $active = $carousel.find ( '.item.active' );
			if ( utils.isLastAndOverflow( $carousel, $active.next() ) ) {
				$carousel.find( '.right.carousel-control' ).show();
			}
		},
		'handleNavBars' : function ( $carousel, options, bPartial ) {

			if ( !utils.hasPartialSegment( $carousel ) ) {
				var $rightControl = $carousel.find( '.right.carousel-control' );
				var $leftControl  = $carousel.find( '.left.carousel-control' );
				var $active       = $carousel.find( '.item.active' );
				handleRightNav( $carousel, $rightControl, $active, options );
				handleLeftNav( $carousel, $active, $leftControl );
			}
		},

		'showLeftOnDemand' : function ( $carousel, nCalcLeft ) {
			var nLeft = nCalcLeft;
			nLeft = !nLeft ? nLeft = parseInt( $carousel.find( '.item:first' ).css( 'left' ), 10 ) * -1 : nLeft;
			nLeft -= $carousel.data().projectedMove;

			$carousel.data( { 'stopSwipeLeft' : false } );
			if ( nLeft < 0 ) {
				$carousel.find( '.left.carousel-control' ).show();
			} else {
				$carousel.find( '.left.carousel-control' ).hide();
				$carousel.data( { 'stopSwipeLeft' : true } );
			}
		},

		'showRightOnDemand' : function ( $carousel, nCalcLeft ) {
			var nTotal = utils.getTotalWidth( $carousel );
			var nLeft = nCalcLeft;
			if ( !nLeft ) {
				nLeft = parseInt( $carousel.find( '.item:first' ).css( 'left' ), 10 ) * -1;
			}
			nLeft += $carousel.data().projectedMove ;

			$carousel.data( { 'stopSwipeRight' : false } );
			if ( nTotal > nLeft ) {
				$carousel.find( '.right.carousel-control' ).show();
			}
			if ( nTotal <= nLeft ) {
				$carousel.find( '.right.carousel-control' ).hide();
				$carousel.data( { 'stopSwipeRight' : true } );
				// Hiding right controls means we are at the last item
				$carousel.data().onLastNav();
			}
		}

	};
} );
