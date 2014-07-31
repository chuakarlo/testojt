define( function ( require ) {
	'use strict';

	var _ = require( 'underscore' );

	// This function is used because ColdFusion returns boolean true false on values
	// that have been saved as either 'yes' or 'no' in any capitalization.
	// It also appears to strip trailing spaces, so we are pre-pending them.
	return function ( object ) {

		// Loop through each of the args looking for yes or no
		_.each( object, function ( element, index, list ) {

			// Prepend space to strings that are 'Yes' or 'No'
			if ( typeof element === 'string' && ( element.toUpperCase() === 'NO' || element.toUpperCase() === 'YES' ) ) {
				list[ index ] = ' ' + element;
			}

		} );

	};

} );
