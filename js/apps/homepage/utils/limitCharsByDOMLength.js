define( function ( require ) {
	'use strict';

	require( 'jquery-dotdotdot' );

	/**
	 * Put ellipsis and adjust max with. Only applicable to Widget items
	 * @param  { Jquery } container        Widget Item container
	 * @param  { String } descriptionByCSS description class inside widget item
	 * @param  { String } siblingByCSS     sibling class of description
	 */
	return function ( container, descriptionByCSS , siblingByCSS ) {
		var description = container.find( descriptionByCSS );
		var sibling     = container.find( siblingByCSS );

		if ( container && sibling ) {
			//25px - padding 10px + 10px for ellipsis
			var maxWidth = container.width() - ( sibling.outerWidth() - 25 );
			description.css ( { 'max-width' : maxWidth + 'px' } );
			description.dotdotdot();
		}
	};

} );
