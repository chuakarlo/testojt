define( function ( require ) {
	'use strict';

	var $               = require( 'jquery' );
	var captionSelector = '.nivo-caption';
	var billboardHolder = '#billboard-container';

	var hideDirectionNav = function () {
		var collectionLength = $( '.nivo-controlNav' ).children().length;
		var hidden           = false;
		$( billboardHolder ).hide().fadeIn( 500 );
		if ( collectionLength < 2 ) {
			$( '.nivo-directionNav' ).hide();
			hidden = true;
		}
		return hidden;
	};

	return function () {
		return {
			pauseTime    : 5000,
			effect       : 'fade',
			pauseOnHover : true,
			animSpeed    : '1000',
			afterLoad    : hideDirectionNav,
			beforeChange : function () {
				$( captionSelector ).fadeOut( 500 );
			},
			afterChange  : function () {
				$( captionSelector ).fadeIn( 500 );
			}
		};
	};
} );
