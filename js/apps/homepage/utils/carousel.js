define( function ( require ) {
	'use strict';

	var $               = require( 'jquery' );
	var OPTIONS_DEFAULT = {
		'interval' : false,
		'circular' : false
	};

	function applySwipe ( $carousel ) {
		require( [ 'pc-swipe' ], function () {
			$carousel.swipe( {
				threshold  : 0,
				swipeLeft  : function () {
					if ( this.find( '.item.active' ).next().length ) {
						$( this ).carousel( 'next' );
					}
				},
				swipeRight : function () {
					if ( this.find( '.item.active' ).prev().length ) {
						$( this ).carousel( 'prev' );
					}
				}
			} );
		} );
	}

	return {

		'carouselApplySettings' : function ( $carousel, options ) {
			options = $.extend( { }, OPTIONS_DEFAULT, options );

			$carousel.carousel( {
				'interval' : options.interval
			} );

			applySwipe( $carousel );

			if ( options.circular ) {
				return; //early return so that code below will not be performed
			}

			var $rightControl = $carousel.find( '.right.carousel-control' );
			var $leftControl = $carousel.find( '.left.carousel-control' );

			// hide the left control (first slide)
			$leftControl.hide();

			$carousel.bind( 'slid.bs.carousel', function () {
				var $active = $carousel.find( '.item.active' );

				// if the last slide,
				if ( !$active.next().length )  {
					$rightControl.hide();
				} else {
					$rightControl.show();
				}

				// if the first slide
				if ( !$active.prev().length )  {
					$leftControl.hide();
				} else {
					$leftControl.show();
				}

			} );
		}
	};
} );
