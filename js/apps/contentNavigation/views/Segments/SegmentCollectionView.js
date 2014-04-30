define( function ( require ) {
	'use strict';

	var Marionette       = require( 'marionette' );
	var segmentItemView  = require('./SegmentItemView');
	var segmentEmptyView = require('./SegmentCollectionEmptyView');

	return Marionette.CollectionView.extend( {

		'tagName' : 'ul',

		'className' : 'row cn-segments-container',

		'emptyView' : segmentEmptyView,

		'itemView' : segmentItemView

	} );

} );