define( function ( require ) {
	'use strict';

	var _ = require( 'underscore' );

	var App          = require( 'App' );
	var NoItemView   = require( 'videoPlayer/views/NoItemView' );
	var utils        = require( 'videoPlayer/utils/utils' );

	var CarouselView = App.Common.CarouselView;
	var template     = require( 'text!videoPlayer/templates/tabs/videoCollectionView.html' );

	return CarouselView.extend( {

		'template' : _.template( template ),

		'itemView'  : App.Common.SegmentCardsView,

		'emptyView' : NoItemView,

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );
		},

		'onShow' : function () {
			// Adding mobile class for styling.
			if ( utils.isMobile() ) {
				this.$el.addClass( 'mobile' );
			}
			this.trigger( 'show:carousel' );
		},

		'getCarouselEl' : function () {
			return this.el;
		}

	} );

} );
