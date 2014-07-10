define( function ( require ) {
	'use strict';

	var $       = require( 'jquery' );
	var utils   = require( 'apps/homepage/utils/carousel/utils' );
	var navbars = require( 'apps/homepage/utils/carousel/navbars' );

	return {
		'onRightMove' : function ( $carousel ) {
			navbars.onRightMove( $carousel );
		},
		'onLeftMove' : function ( $carousel ) {
			navbars.onLeftMove( $carousel );
		},
		'adjustOnLastItem' : function ( $carousel ) {

			var $active   = $carousel.find( '.item.active' );
			if ( !$active.next().length ) {
				// calculate half
				var nLeft = navbars.onRightMove( $carousel );
				utils.animateItems( $carousel, nLeft );

				var nTotalWidth = utils.getTotalWidth( $carousel );
				$carousel.find( '.carousel-inner' ).css( { 'width' :  ( nTotalWidth * 3 ) + 'px' } );
			}
			utils.setProjectedMove( $carousel );
		},

		'adjustOnFirstItem' : function ( $carousel ) {

			var $active   = $carousel.find( '.item.active' );
			if ( !$active.prev().length ) {
				var nLeft = navbars.onLeftMove( $carousel );
				utils.animateItems( $carousel, nLeft );
			}
			utils.setProjectedMove( $carousel );
		},

		'handleLeftAdjust' : function ( event ) {
			var target    = ( event.currentTarget ) ? event.currentTarget : event.srcElement;
			var $carousel = $( target );

			// calculate half
			var nLeft       = 0;
			var nTotalWidth = utils.getTotalWidth( $carousel );
			if ( event.direction === 'left' ) {
				nLeft = navbars.onRightMove( $carousel, false );
			} else {
				nLeft = navbars.onLeftMove( $carousel );
			}
			$carousel.find( '.carousel-inner' ).css( { 'width' :  ( nTotalWidth * 3 ) + 'px' } );
			if ( $carousel.data.index > $carousel.data().total ) {
				$carousel.data( { 'index' : $carousel.data().total } );
			} else {
				utils.animateItems( $carousel, nLeft );
			}
		}
	};
} );
