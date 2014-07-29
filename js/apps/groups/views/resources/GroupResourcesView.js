define( function ( require ) {
	'use strict';

	var Marionette        = require( 'marionette' );
	var ResourceItemView  = require( 'groups/views/resources/GroupResourceItemView' );
	var ResourceEmptyView = require( 'groups/views/resources/GroupResourceEmptyView' );

	return Marionette.CollectionView.extend( {

		'itemView'  : ResourceItemView,
		'tagName'   : 'ul',
		'className' : 'resource-leader media-list',
		'emptyView' : ResourceEmptyView

	} );

} );
