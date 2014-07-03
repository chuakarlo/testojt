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

	function syncCarousel ( view, token , size, formula ) {
		var item   = view.find( '.item' );
		var active = view.find( '.active' );

		var index  = ( item ).index( active );
		var target = view.parent(  ).find( '#' + token + '-pd360-slide-' + size  );
		target.find( '.item.active'  ).removeClass( 'active' );
		var item2   = target.find( '.item' );
		$( $( item2 ).get( formula( index ) ) ).addClass( 'active' );
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
				'interval' : options.interval,
				'wrap'     : false
			} );

			applySwipe( $carousel );

			if ( options.circular ) {
				return; //early return so that code below will not be performed
			}
			var $leftControl  = $carousel.find( '.left.carousel-control' );
			$leftControl.hide();

			$carousel.bind( 'slid.bs.carousel', function () {

				//iPad Orientation videos will not reset
				var token = $( this ).attr( 'id' ).split( '-pd360-slide-' );
				if ( token[ 1 ] === 'md' ) {
					syncCarousel( $( this ), token[ 0 ], 'sm', function (  index  ) {
						return index + Math.floor(  index / 2 );
					} );
				} else if ( token[ 1 ] === 'sm' ) {
					syncCarousel( $( this ), token[ 0 ], 'md', function ( index ) {
						return index - Math.floor( ( index + 1 ) * ( 0.25 ) );
					} );
				}
				handleNavBars( $carousel, options );
			} );
		}
	};
} );
