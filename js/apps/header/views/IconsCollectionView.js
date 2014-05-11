define( function ( require ) {
	'use strict';

	var Marionette   = require( 'marionette' );
	var IconItemView = require( 'header/views/IconItemView' );

	return Marionette.CollectionView.extend( {

		'tagName'   : 'ul',
		'className' : 'resources-list',
		'itemView'  : IconItemView

	} );

} );
