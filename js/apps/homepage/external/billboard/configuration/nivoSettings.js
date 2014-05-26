define( function ( require ) {
	'use strict';

	var $               = require( 'jquery' );
	var captionSelector = '.nivo-caption';
	var billboardHolder = '#billboard-container';
	var nivoNextNav     = '.nivo-nextNav';
	var nivoPrevNav     = '.nivo-prevNav';

	var initSwipe = function ( element ) {

		element = $( billboardHolder );

		element.swipe( {
			threshold        : 0,
			excludedElements : '.noSwipe',
			swipeLeft        : function () {
				$( nivoNextNav ).click();
			},
			swipeRight       : function () {
				$( nivoPrevNav ).click();
			},

			tap : function ( event, elem ) {
				if ( $( elem ).is( nivoNextNav ) ) {
					$( nivoNextNav ).click();
				}

				if ( $( elem ).is( nivoPrevNav ) ) {
					$( nivoPrevNav ).click();
				}
			}
		} );
	};

	var initDirectionNav = function () {
		var collectionLength = $( '.nivo-controlNav' ).children().length;
		$( billboardHolder ).hide().fadeIn( 500 );
		if ( collectionLength < 2 ) {
			$( '.nivo-directionNav' ).hide();
		}
	};

	var afterLoad = function () {
		initSwipe();
		initDirectionNav();
	};

	return function () {
		return {
			pauseTime    : 5000,
			effect       : 'fade',
			pauseOnHover : true,
			afterLoad    : afterLoad,
			prevText     : '',
			nextText     : '',
			beforeChange : function () {
				$( captionSelector ).fadeOut( 500 );
			},
			afterChange  : function () {
				$( captionSelector ).fadeIn( 500 );
			}
		};
	};
} );
