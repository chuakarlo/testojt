define( function ( require ) {
	'use strict';

	require( 'jquery-dotdotdot' );

	return {
		'limitDescriptionByWidth' : function ( elem, containerByCSS, siblingByCSS ) {
			var container = elem.closest( containerByCSS );
			var sibling = container.find( siblingByCSS );

			if ( container && sibling ) {
				//25px - padding 10px + 10px for ellipsis
				var maxWidth = container.width() - sibling.outerWidth() - 25;
				elem.css ( { 'max-width' : maxWidth + 'px' } );
				elem.dotdotdot();
			}

		}
	};

} );
