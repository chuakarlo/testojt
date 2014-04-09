define( function ( require ) {
	'use strict';

	var Marionette    = require( 'marionette' );
	var GroupItemView = require( 'videoPlayer/views/share/GroupItemView' );
	var EmptyView     = require( 'videoPlayer/views/NoItemView' );

	return Marionette.CollectionView.extend( {

		'itemView' : GroupItemView,

		'tagName' : 'ul',

		'emptyView' : EmptyView

	} );

} );
