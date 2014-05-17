define( function ( require ) {
	'use strict';

	require( 'pc-carouselSnap' );

	var Marionette = require( 'marionette' );

	var VideoResourceItemView = require( 'videoPlayer/views/tabs/VideoResourceItemView' );

	return Marionette.CollectionView.extend( {

		'itemView'  : VideoResourceItemView,

		'tagName'   : 'ul',

		'className' : 'row',

		'onShow' : function () {
			this.$el.carouselSnap( {
				nextID                : 'next-slide',
				prevID                : 'previous-slide',
				elementsToMoveOnClick : 4,
				startOnCenter         : true
			} );
		},

		'onClose' : function () {
			this.collection.reset( [ ] );
		}

	} );

} );
