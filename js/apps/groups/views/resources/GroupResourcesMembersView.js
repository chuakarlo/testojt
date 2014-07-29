define( function ( require ) {
	'use strict';

	var Marionette        = require( 'marionette' );
	var ResourceItemView  = require( './GroupResourceItemView' );
	var ResourceEmptyView = require( './GroupResourceMembersEmptyView' );

	return Marionette.CollectionView.extend( {

		'itemView'  : ResourceItemView,
		'tagName'   : 'ul',
		'className' : 'resource-leader media-list',
		'emptyView' : ResourceEmptyView

	} );

} );
