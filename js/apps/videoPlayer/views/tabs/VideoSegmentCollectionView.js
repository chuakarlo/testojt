define( function ( require ) {
	'use strict';

	var Marionette           = require( 'marionette' );
	var VideoSegmentItemView = require( 'videoPlayer/views/tabs/VideoSegmentItemView' );

	require( 'carouselSnap' );

	return Marionette.CollectionView.extend( {

		'itemView'   : VideoSegmentItemView,

		'tagName'    : 'ul',

		'className'  : 'vid-tab',

		'onShow' : function () {

			this.$el.carouselSnap( {

				'nextID'         : 'nextSlide',
				'prevID'         : 'previousSlide',
				'elementsToMove' : 1,
				'startOnCenter'  : false,
				'time'           : 2000

			} );

		}

	} );

} );
