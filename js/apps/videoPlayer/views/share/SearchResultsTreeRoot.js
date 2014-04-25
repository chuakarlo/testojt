define( function ( require ) {
	'use strict';

	var Marionette            = require( 'marionette' );
	var SearchResultsTreeView = require( 'videoPlayer/views/share/SearchResultsTreeView' );
	var EmptyView             = require( 'videoPlayer/views/NoItemView' );

	// The tree's root: a simple collection view that renders
	// a recursive tree structure for each item in the collection
	return Marionette.CollectionView.extend( {

		'tagName'   : 'ul',
		'itemView'  : SearchResultsTreeView,
		'emptyView' : EmptyView
	} );

} );
