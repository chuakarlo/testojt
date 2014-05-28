define( function ( require ) {
	'use strict';

	require( 'pc-carouselSnap' );
	require( 'jquery-browser' );

	var Marionette            = require( 'marionette' );
	var VideoResourceItemView = require( 'videoPlayer/views/tabs/VideoResourceItemView' );
	var NoItemView            = require( 'videoPlayer/views/NoItemView' );

	return Marionette.CollectionView.extend( {

		'itemView'  : VideoResourceItemView,

		'tagName'   : 'ul',

		'className' : 'row',

		'emptyView' : NoItemView,

		'onShow' : function () {
			if ( this.collection.length !== 0 ) {
				this.$el.carouselSnap( {
					nextID                : 'next-slide',
					prevID                : 'previous-slide',
					elementsToMoveOnClick : 4,
					startOnCenter         : true
				} );
			} else {
				this.$el.css( {
					'height' : 'auto',
					'margin' : 0
				} );
			}
		},

		'onClose' : function () {
			this.collection.reset( [ ] );
		}

	} );

} );
