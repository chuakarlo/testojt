define( function ( require ) {
	'use strict';

	var _ = require( 'underscore' );

	var CarouselView      = require( 'common/views/CarouselView' );
	var SegmentCardsView  = require( 'common/views/SegmentCardsView' );
	var CarouselEmptyView = require( 'common/views/CarouselEmptyView' );
	var template          = require( 'text!common/templates/videoCarouselView.html' );

	return CarouselView.extend( {

		'template' : _.template( template ),

		'itemView'  : SegmentCardsView,

		'emptyView' : CarouselEmptyView,

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );
		},

		'onShow' : function () {
			this.trigger( 'show:carousel' );
		},

		'getCarouselEl' : function () {
			return this.el;
		}

	} );

} );
