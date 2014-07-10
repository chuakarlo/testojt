define( function ( require ) {
	'use strict';

	var utils = require( 'apps/homepage/utils/carousel/utils' );

	function handleRightNav ( $carousel, $rightControl, $active, options ) {
		if ( !$active.next().length )  {
			$rightControl.hide();
			$carousel.data().onLastNav();
		} else {
			$rightControl.show();
		}
	}

	function handleLeftNav ( $active, $leftControl ) {
		// if the first slide
		if ( !$active.prev().length )  {
			$leftControl.hide();
		} else {
			$leftControl.show();
		}
	}

	return {
		'handleNavBars' : function ( $carousel, options, bPartial ) {

			if ( !utils.hasPartialSegment( $carousel ) ) {
				var $rightControl = $carousel.find( '.right.carousel-control' );
				var $leftControl  = $carousel.find( '.left.carousel-control' );
				var $active       = $carousel.find( '.item.active' );
				handleRightNav( $carousel, $rightControl, $active, options );
				handleLeftNav( $active, $leftControl );
			}
		},

		'showLeftOnDemand' : function ( $carousel, nCalcLeft ) {
			var nLeft = nCalcLeft;
			nLeft = !nLeft ? nLeft = parseInt( $carousel.find( '.item:first' ).css( 'left' ), 10 ) * -1 : nLeft;
			nLeft -= $carousel.data().projectedMove;
			if ( nLeft < 0 ) {
				$carousel.find( '.left.carousel-control' ).show();
			} else {
				$carousel.find( '.left.carousel-control' ).hide();
			}
		},

		'showRightOnDemand' : function ( $carousel, nCalcLeft ) {
			var nTotal = utils.getTotalWidth( $carousel );
			var nLeft = nCalcLeft;
			if ( !nLeft ) {
				nLeft = parseInt( $carousel.find( '.item:first' ).css( 'left' ), 10 ) * -1;
			}
			nLeft += $carousel.data().projectedMove ;
			if ( nTotal > nLeft ) {
				$carousel.find( '.right.carousel-control' ).show();
			}
			if ( nTotal <= nLeft ) {
				$carousel.find( '.right.carousel-control' ).hide();
				// Hiding right controls means we are at the last item
				$carousel.data().onLastNav();
			}
		}

	};
} );
