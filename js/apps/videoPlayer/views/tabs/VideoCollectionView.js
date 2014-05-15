define( function ( require ) {
	'use strict';

	require( 'pc-carouselSnap' );

	var App           = require( 'App' );
	var Marionette    = require( 'marionette' );

	require( 'common/views' );

	return Marionette.CollectionView.extend( {

		'itemView'  : App.Common.SegmentCardsView,

		'tagName'   : 'ul',
		'className' : 'row',

		'onShow' : function () {
			var pID = this.$el.parent()[ 0 ].id;
			this.$el.carouselSnap( {
				nextID                : 'next-slide-' + pID,
				prevID                : 'previous-slide-' + pID,
				elementsToMoveOnClick : 4,
				startOnCenter         : true
			} );
		},

		'onClose' : function () {
			this.collection.reset( [ ] );
		}

	} );

} );
