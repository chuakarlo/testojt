define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var rowutils = require( 'apps/homepage/utils/carousel/rowutils' );

	return {
		'applySwipe' : function ( $carousel ) {
			require ( [ 'pc-swipe' ], function () {
				if ( $( 'html' ).hasClass( 'touch' )  ) {
					$carousel.swipe( {
						threshold  : 0,
						swipeLeft  : function () {
							$( this ).carousel( 'next' );
							rowutils.adjustOnLastItem( this );
						},
						swipeRight : function () {
							$( this ).carousel( 'prev' );
							rowutils.adjustOnFirstItem( this );
						}
					} );
				}
			} );
		}
	};

} );
