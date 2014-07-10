define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var utils    = require( 'apps/homepage/utils/carousel/utils' );
	var rowutils = require( 'apps/homepage/utils/carousel/rowutils' );
	var navbars  = require( 'apps/homepage/utils/carousel/navbars' );

	function isTouch () {
		if ( $( 'html' ).hasClass( 'touch' ) ) {
			return true;
		}
		return false;
	}

	return {
		'applySwipe'         : function ( $carousel ) {
			require ( [ 'pc-swipe' ], function () {
				if ( $( 'html' ).hasClass( 'touch' )  ) {
					$carousel.swipe( {
						threshold        : 3,
						allowPageScroll  : 'vertical',
						excludedElements : '.noSwipe',
						swipeLeft        : function ( event ) {
							if ( $( this ).data().index < $( this ).data().total ) {
								$( this ).find( '.right.carousel-control' ).click();
								rowutils.adjustOnLastItem( $( this ) );
							} else {
								$( this ).data( { 'index' : $( this ).data().total } );
							}
						},
						swipeRight       : function ( event ) {
							if ( $( this ).data().index > 0 ) {
								$( this ).find( '.left.carousel-control' ).click();
								rowutils.adjustOnFirstItem( $( this ) );
							}
						}

					} );
				}
			} );
		},
		'handleTouchNavBars' : function ( $carousel ) {
			if ( isTouch() && utils.hasPartialSegment( $carousel ) ) {
				$carousel.find( '.right.carousel-control' ).hide();
				$carousel.find( '.left.carousel-control' ).hide();
				return true;
			} else {
				navbars.handleNavBars( $carousel );
				return false;
			}
		}
	};

} );
