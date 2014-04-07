define( function ( require ) {
	'use strict';

	var Marionette           = require( 'marionette' );
	var $                    = require( 'jquery' );
	var VideoSegmentItemView = require( 'videoPlayer/views/tabs/VideoSegmentItemView' );

	require( 'slick' );

	return Marionette.CollectionView.extend( {

		'itemView'  : VideoSegmentItemView,

		'tagName'   : 'div',

		'className' : 'slick',

		'ui'        : {
			'next' : 'button.slick-next',
			'prev' : 'button.slick-prev'
		},

		'onShow' : function () {

			this.$el.slick({
				slidesToShow: 4,
				slidesToScroll: 4
			} );
			this.hoverNext( this.$el );
			this.hoverPrev( this.$el );
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
