define( function ( require ) {
	'use strict';

	var $ = require( 'jquery' );

	$.fn.selectText = function () {
		var element = this[ 0 ];
		var range;
		var selection;

		if ( window.getSelection ) { // other browsers
			selection = window.getSelection();
			range     = document.createRange();
			range.selectNodeContents( element );
			selection.removeAllRanges();
			selection.addRange( range );
		} else if ( document.body.createTextRange ) { // ie8 and below
			range = document.body.createTextRange();
			range.moveToElementText( element );
			range.select();
		}
	};

} );
