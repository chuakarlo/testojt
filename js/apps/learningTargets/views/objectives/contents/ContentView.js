define( function ( require ) {
	'use strict';

	var Marionette    = require( 'marionette' );
	var TitleItemView = require( 'apps/learningTargets/views/objectives/contents/ContentItemView' );
	var EmptyView     = require( 'apps/learningTargets/views/objectives/contents/EmptyView' );

	return Marionette.CollectionView.extend( {
		'tagName'   : 'ul',
		'className' : 'nav-objectives',
		'itemView'  : TitleItemView,
		'emptyView' : EmptyView
	} );
} );
