define( function( require ) {
	'use strict';

	require( 'slick' );

	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );

	var LoadingView            = require( 'videoPlayer/views/LoadingView' );
	var RelatedVideoItemView   = require( 'videoPlayer/views/tabs/RelatedVideoItemView' );

	return Marionette.CollectionView.extend( {

		'itemView': RelatedVideoItemView,

		'emptyView': LoadingView, // to show loading animation when no collection is still available

		'tagName': 'div',

		'className': 'slick',

		'ui': {
			'next': 'button.slick-next',
			'prev': 'button.slick-prev'
		},

		'initialize': function () { },

		'hover': function ( element, time, callback ) {
			$( element ).hover( function() {
				//start time
				if ( !this.timeoutId ) {
					this.timeoutId = window.setInterval( callback, time ); //for 1 second
				}
			}, this.clearTimeout );
		},
		'hoverNext': function ( element ) {
			this.hover( this.ui.next, 1500, function() {
				element.slickNext( 1 );
			} );
		},
		'hoverPrev': function ( element ) {
			this.hover( this.ui.prev, 1500, function() {
				element.slickPrev( 1 );
			} );
		},
		'clearTimeout': function () {
			if ( this.timeoutId ) { //reset time
				window.clearInterval( this.timeoutId );
				this.timeoutId = null;
			}
		},
		'onShow' : function () {
			this.$el.slick( {
				'slidesToShow'   : 4,
				'slidesToScroll' : 4
			} );
			this.hoverNext( this.$el );
			this.hoverPrev( this.$el );
		},

		'onClose' : function () {
			this.collection.reset( [] );
		}
	} );
} );