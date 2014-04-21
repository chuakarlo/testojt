define( function ( require ) {
	'use strict';

	var $               = require( 'jquery' );
	var captionSelector = '.nivo-caption';

	var hideDirectionNav = function () {
		var collectionLength = $( '.nivo-controlNav' ).children().length;
		var hidden           = false;
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
			beforeChange : function () {
				$( captionSelector ).fadeOut( 500 );
			},
			afterChange  : function () {
				$( captionSelector ).fadeIn( 500 );
			},
			afterLoad : hideDirectionNav
		};
	};
} );