define( function ( require ) {
	
	'use strict';

	var Marionette     = require( 'marionette' );
	var filterItemView = require( './FilterItemView' );

	return Marionette.CollectionView.extend( {

		'itemView' : filterItemView

	} );

} );