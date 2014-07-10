define( function ( require ) {
	'use strict';

	var $               = require( 'jquery' );
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
		'setProjectedMove' : function ( $carousel ) {
			utils.setProjectedMove( $carousel );
		},
		'setLogicalRow' : function ( $carousel ) {
			utils.setLogicalRow( $carousel );
		},
		'onRemoveItem' : function ( $carousel ) {
			utils.setLogicalRow( $carousel );
			utils.setProjectedMove( $carousel );
			var index        = $carousel.data().index;
			var nCurrentLeft = parseInt( $carousel.find( '.item:first' ).css( 'left' ), 10 ) * -1;
			var nCalcLeft    = ( index ) * $carousel.data().projectedMove;
			if ( nCalcLeft >= nCurrentLeft ) {
				// we have to adjust left
				--index;
				if ( index < 0 ) {
					index = 0;
				}
				$carousel.data( { 'index' : index } );
				var nLeft = index * $carousel.data().projectedMove * -1;
				utils.animateItems( $carousel, ( nLeft ) );
			}
			navbars.handleNavBars( $carousel );
		},
		'hasPartialSegment' : function ( $carousel ) {
			return utils.hasPartialSegment( $carousel );
		},
		'carouselHandleNavBars' : function ( $carousel ) {
			navbars.handleNavBars( $carousel );
		},
		// should only be called once
		'carouselApplySettings' : function ( $carousel, options ) {

			options = $.extend( { }, OPTIONS_DEFAULT, options );
			$carousel.carousel( {
				'interval' : options.interval,
				'wrap'     : false
			} );
			// return here if circular ( currently not circular carousel )

			touch.applySwipe( $carousel );

			$carousel.data( { 'onLastNav' : options.onLastNav } );
			$carousel.find( '.left.carousel-control' ).hide();

			utils.setLogicalRow( $carousel );
			$carousel.data( { 'index' : 0 } );

			utils.setProjectedMove( $carousel );
			navbars.handleNavBars( $carousel );

			$carousel.bind( 'slide.bs.carousel', function ( event ) {

				var $active     = $carousel.find ( '.item.active' );
				if ( ( $active.next().length && event.direction === 'left' ) ||
					( $active.prev().length && event.direction === 'right' ) )
				{
					$carousel.data( { 'direction' : event.direction } );
					rowutils.handleLeftAdjust( event );
					navbars.handleNavBars( $carousel );
				}
			} );

			$carousel.bind( 'slid.bs.carousel', function ( event ) {
			} );
		}
	};
} );
