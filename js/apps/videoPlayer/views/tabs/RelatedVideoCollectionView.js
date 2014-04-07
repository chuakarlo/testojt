define( function( require ) {
	'use strict';

	require( 'slick' );

	var Marionette = require( 'marionette' );
	var $ = require( 'jquery' );

	var LoadingView = require( 'videoPlayer/views/LoadingView' );
	var RelatedVideoCollection = require( 'videoPlayer/collections/RelatedVideoCollection' );
	var RelatedVideoItemView = require( 'videoPlayer/views/tabs/RelatedVideoItemView' );

	return Marionette.CollectionView.extend( {

		'itemView': RelatedVideoItemView,

		'emptyView': LoadingView, // to show loading animation when no collection is still available

		'tagName': 'div',

		'className': 'slick',

		'ui': {
			'next': 'button.slick-next',
			'prev': 'button.slick-prev'
		},

		'initialize': function( options ) {
			this.collection = new RelatedVideoCollection();
			this.fetchVideos( options.ContentId );
			this.listenTo( this.collection, 'custom:sync', this.setCarousel );
			this.timeoutId = null;
		},

		'setCarousel': function() {
			this.$el.slick( {
				slidesToShow: 4,
				slidesToScroll: 4
			} );
			this.hoverNext( this.$el );
			this.hoverPrev( this.$el );
		},

		'fetchVideos': function( id ) {
			var request = {
				'args': {
					'ContentId': id
				}
			};
			this.collection.fetchRelatedVid( request, {
				'reset': true
			} );
		},

		'onClose': function() {
			this.collection.reset();
		},

		'hover': function( element, time, callback ) {
			$( element ).hover( function() {
				//start time
				if ( !this.timeoutId ) {
					this.timeoutId = window.setInterval( function() {
						callback();
					}, time ); //for 1 second
				}
			}, this.clearTimeout );
		},
		'hoverNext': function( element ) {
			this.hover( this.ui.next, 1500, function() {
				element.slickNext( 1 );
			} );
		},
		'hoverPrev': function( element ) {
			this.hover( this.ui.prev, 1500, function() {
				element.slickPrev( 1 );
			} );
		},
		'clearTimeout': function() {
			//reset time
			if ( this.timeoutId ) {
				window.clearInterval( this.timeoutId );
				this.timeoutId = null;
			}
		}
	} );
} );