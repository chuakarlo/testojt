define( function ( require ) {
	'use strict';

	var Marionette        = require( 'marionette' );
	var ResourceItemView  = require( '../views/GroupResourceItemView' );
	var ResourceEmptyView = require( '../views/GroupResourceEmptyView' );

	return Marionette.CollectionView.extend( {

		'itemView'  : ResourceItemView,
		'tagName'   : 'ul',
		'className' : 'resource-leader media-list',
		'emptyView' : ResourceEmptyView

	} );

} );
