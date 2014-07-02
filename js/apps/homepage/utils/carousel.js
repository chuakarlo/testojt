define( function ( require ) {
	'use strict';

	var $               = require( 'jquery' );
	var OPTIONS_DEFAULT = {
		'interval'  : false,
		'circular'  : false,
		'onLastNav' : function () {},
		'firstLoad' : false
	};

	function applySwipe ( $carousel ) {
		require( [ 'pc-swipe' ], function () {
			$carousel.swipe( {
				threshold  : 0,
				swipeLeft  : function () {
					$( this ).carousel( 'next' );
				},
				swipeRight : function () {
					$( this ).carousel( 'prev' );
				}
			} );
		} );
	}

	function handleNavBars ( $carousel, options ) {

		var $rightControl = $carousel.find( '.right.carousel-control' );
		var $leftControl  = $carousel.find( '.left.carousel-control' );
		var $active       = $carousel.find( '.item.active' );

		// if the last slide,
		if ( !$active.next().length )  {
			$rightControl.hide();
			if ( options ) {
				options.onLastNav( $carousel );
			}
		} else {
			$rightControl.show();
		}

		// if the first slide
		if ( !$active.prev().length )  {
			$leftControl.hide();
		} else {
			$leftControl.show();
		}
	}

	return {

		'carouselHandleNavBars' : function ( $carousel ) {
			handleNavBars( $carousel );
		},
		//should only be called once
		'carouselApplySettings' : function ( $carousel, options ) {
			options = $.extend( { }, OPTIONS_DEFAULT, options );
			$carousel.carousel( {
				'interval' : options.interval
			} );

			applySwipe( $carousel );

			if ( options.circular ) {
				return; //early return so that code below will not be performed
			}
			var $leftControl  = $carousel.find( '.left.carousel-control' );
			$leftControl.hide();

			$carousel.bind( 'slid.bs.carousel', function () {
				handleNavBars( $carousel, options );
			} );
		}
	};
} );
