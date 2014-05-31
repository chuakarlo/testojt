define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	var SelectedItemView = require( 'share/views/SelectedItemView' );

	return Marionette.CollectionView.extend( {

		'itemView' : SelectedItemView,

		'tagName'  : 'ul'

	} );

} );
