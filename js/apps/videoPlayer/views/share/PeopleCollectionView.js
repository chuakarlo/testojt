define( function ( require ) {
	'use strict';

	var Marionette     = require( 'marionette' );
	var PersonItemView = require( 'videoPlayer/views/share/PersonItemView' );
	var EmptyView      = require( 'videoPlayer/views/NoItemView' );

	return Marionette.CollectionView.extend( {

		'itemView' : PersonItemView,

		'tagName' : 'ul',

		'emptyView' : EmptyView

	} );

} );
