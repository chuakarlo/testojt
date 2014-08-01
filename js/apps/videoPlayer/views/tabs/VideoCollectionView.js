define( function ( require ) {
	'use strict';

	var _ = require( 'underscore' );

	var App          = require( 'App' );
	var NoItemView   = require( 'videoPlayer/views/NoItemView' );

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
			this.trigger( 'show:carousel' );
		},

		'getCarouselEl' : function () {
			return this.el;
		}

	} );

} );
