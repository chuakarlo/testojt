define( function ( require ) {
	'use strict';
	var utils   = require( 'apps/homepage/utils/carousel/utils' );

	return {
		'handleNavBars' : function ( $carousel, options, bPartial ) {
			var $rightControl = $carousel.find( '.right.carousel-control' );
			var $leftControl  = $carousel.find( '.left.carousel-control' );
			var index         = $carousel.data().index;

			if ( index <= 0 ) {
				$leftControl.hide();
			} else {
				$leftControl.show();
			}

			if ( index >= $carousel.data().total ) {
				$rightControl.hide();
				$carousel.data().onLastNav();
			} else {
				$rightControl.show();
			}
		},
		'onRightMove'   : function ( $carousel, bAdjust ) {

			var nTotalWidth = utils.getTotalWidth( $carousel ) * -1;
			var index       = $carousel.data().index;
			var indexTotal  = $carousel.data().total;
			++index;
			if ( index > indexTotal  && bAdjust ) {
				index = indexTotal;
			}
			$carousel.data( { 'index' : index } );

			var nLeft = ( index * $carousel.data().projectedMove ) * -1;
			nLeft = ( nLeft < nTotalWidth ) ? nTotalWidth : nLeft;

			this.handleNavBars( $carousel );
			return nLeft;
		},
		'onLeftMove'    : function ( $carousel ) {
			var index       = $carousel.data().index;
			--index;
			if ( index < 0 ) {
				index = 0;
			}
			$carousel.data( { 'index' : index } );
			var nLeft = ( index * $carousel.data().projectedMove ) * -1;
			nLeft = ( nLeft > 0 ) ? 0 : nLeft;
			this.handleNavBars( $carousel );

			return nLeft;
		}
	};

} );
