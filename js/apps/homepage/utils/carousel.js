define( function ( require ) {
	'use strict';

	var $               = require( 'jquery' );
	var ITEM_WIDTH      = 285;
	var OPTIONS_DEFAULT = {
		'interval'  : false,
		'circular'  : false,
		'onLastNav' : function () {},
		'firstLoad' : false
	};
	var utils    = require( 'apps/homepage/utils/carousel/utils' );
	var rowutils = require( 'apps/homepage/utils/carousel/rowutils' );
	var navbars  = require( 'apps/homepage/utils/carousel/navbars' );
	var touch    = require( 'apps/homepage/utils/carousel/touch' );

	return {

		'adjustOnLastItem' : function ( $carousel ) {
			rowutils.adjustOnLastItem( $carousel );
		},
		'adjustOnFirstItem' : function ( $carousel ) {
			rowutils.adjustOnFirstItem( $carousel );
		},
		'addLeftOnNewItems' : function ( $carousel ) {
			var nLeft = $carousel.find( '.item:first' ).css( 'left' );
			$carousel.find( '.item' ).css( { 'left' : nLeft } );
		},
		'showRightOnDemand' : function ( $carousel ) {
			navbars.showRightOnDemand( $carousel );
		},
		'onRemoveItem' : function ( $carousel ) {

			var nTotal = utils.getTotalWidth( $carousel );
			nTotal     = ( nTotal - ( utils.getTotalExcess( $carousel ) * ITEM_WIDTH ) ) * -1;
			var nLeft  = parseInt( $carousel.find( '.item:first' ).css( 'left' ), 10 );

			if ( nTotal >= nLeft )  {
				nLeft += $carousel.data().projectedMove;
				$carousel.find( '.item' ).css( { 'left' : nLeft + 'px' } );
			}

			navbars.showRightOnDemand( $carousel );
			nTotal = utils.getTotalWidth( $carousel );
			if ( nTotal <= 0 ) {
				navbars.handleNavBars( $carousel );
			}
		},
		'hasPartialSegment' : function ( $carousel ) {
			return utils.hasPartialSegment( $carousel );
		},
		'carouselHandleNavBars' : function ( $carousel ) {
			navbars.handleNavBars( $carousel );
		},
		//should only be called once
		'carouselApplySettings' : function ( $carousel, options ) {

			options = $.extend( { }, OPTIONS_DEFAULT, options );
			$carousel.carousel( {
				'interval' : options.interval,
				'wrap'     : false
			} );
			//return here if circular ( currently not circular carousel )

			touch.applySwipe( $carousel );

			$carousel.data( { 'onLastNav' : options.onLastNav } );
			$carousel.find( '.left.carousel-control' ).hide();
			touch.handleTouchNavBars( $carousel );

			rowutils.handleOverFlowNavs( $carousel );
			utils.setProjectedMove( $carousel );

			$carousel.bind( 'slide.bs.carousel', function ( event ) {
				$carousel.data( { 'direction' : event.direction } );
				utils.setProjectedMove( $carousel );
				rowutils.handleLeftAdjust( event );
			} );

			$carousel.bind( 'slid.bs.carousel', function ( event ) {
				if ( !utils.hasPartialSegment ( $carousel ) ) {
					navbars.handleNavBars( $carousel );
				}
			} );
		}
	};
} );
