// prevent body to scroll when  a scrollable div  reaches the bottom/top

define( function ( require ) {
	'use strict';

	var $ = require( 'jquery' );

	return function ( elem , option ) {

		if ( option === 'destroy' ) {
			elem.off( 'mousewheel DOMMouseScroll' ,function () {
				elem.scrollTop( 0 );
			} );
		} else {
			elem.scrollTop( 0 );

			elem.on( 'mousewheel DOMMouseScroll', function ( e ) {
				var scrollTo = 0;

				e.preventDefault();

				if ( e.type === 'mousewheel' ) {
					scrollTo = ( e.originalEvent.wheelDelta * -1 );
				} else if ( e.type === 'DOMMouseScroll' ) {
					scrollTo = 40 * e.originalEvent.detail;
				}

				$( this ).scrollTop( scrollTo + $( this ).scrollTop() );
			} );
		}
	};

} );
