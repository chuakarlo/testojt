define( function ( require ) {
	'use strict';

	return function ( component ) {
		return {
			pauseTime    : 5000,
			effect       : 'fade',
			pauseOnHover : true,
			animSpeed    : '1000',
			beforeChange : function () {
				component.fadeOut( 500 );
			},
			afterChange  : function () {
				component.fadeIn( 500 );
			}
		};
	};
} );