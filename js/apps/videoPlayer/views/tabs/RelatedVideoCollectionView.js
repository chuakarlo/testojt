define ( function ( require ) {
	'use strict';

	require( 'carouselSnap' );

	var Marionette = require( 'marionette' );

	var LoadingView            = require( 'videoPlayer/views/LoadingView' );
	var RelatedVideoCollection = require( 'videoPlayer/collections/RelatedVideoCollection' );
	var RelatedVideoItemView   = require( 'videoPlayer/views/tabs/RelatedVideoItemView' );

	return Marionette.CollectionView.extend( {

		'itemView'   : RelatedVideoItemView,

		'emptyView'  : LoadingView, // to show loading animation when no collection is still available

		'tagName'    : 'ul',

		'className'  : 'vid-tab',

		'initialize' : function ( options ) {
			this.collection = new RelatedVideoCollection();
			this.fetchVideos( options.ContentId );
			this.listenTo( this.collection, 'custom:sync', this.setCarousel );

		},

		'setCarousel' : function () {
			this.$el.carouselSnap( {
				'time' : 1500
			} );
			this.$el.parent().attr( 'id', 'holder' );
		},

		'fetchVideos' : function ( id ) {
			var request = {
				'args' : {
					'ContentId' : id
				}
			};
			this.collection.fetchRelatedVid( request, {
				'reset': true
			} );
		},

		'onClose' : function () {
			this.$el.parent().attr( 'id', '' );
			this.collection.reset();
		}
	} );
} );
