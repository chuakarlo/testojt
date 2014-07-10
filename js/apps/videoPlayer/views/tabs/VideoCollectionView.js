define( function ( require ) {
	'use strict';

	require( 'slick' );

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var NoItemView = require( 'videoPlayer/views/NoItemView' );
	var utils      = require( 'videoPlayer/utils/utils' );
	var config     = App.request( 'videoPlayer:config' );

	return Marionette.CollectionView.extend( {

		'itemView'  : App.Common.SegmentCardsView,

		'tagName'   : 'div',

		'className' : 'slick',

		'emptyView' : NoItemView,

		'onShow' : function () {
			if ( utils.isMobile() ) {
				this.$el.addClass( 'mobile' );
			}
			if ( this.collection.length !== 0 ) {
				this.$el.slick( config.slick );
			}
		},

		'onClose' : function () {
			this.collection.reset( [ ] );
		}

	} );

} );
