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
			}
		} );
	};

	var initDirectionNav = function () {

		$( billboardHolder ).hide().fadeIn( 500 );
		var collectionLength = $( '.nivo-controlNav' ).children().length;
		var bHide            = $( 'html' ).hasClass( 'touch' ) || ( collectionLength < 2 );
		if ( bHide ) {
			$( '.nivo-directionNav' ).hide();
		}
	};

	var afterLoad = function () {
		initSwipe();
		initDirectionNav();
	};

	return function () {
		return {
			pauseTime    : 3000,
			animSpeed    : $( 'html' ).hasClass( 'touch' ) ? 10 : 100,
			effect       : 'fade',
			pauseOnHover : true,
			afterLoad    : afterLoad,
			prevText     : '',
			nextText     : '',
			beforeChange : function () {
				$( captionSelector ).fadeOut( 0 );
			},
			afterChange  : function () {
				$( captionSelector ).fadeIn( 0 );
			}
		};
	};
} );
