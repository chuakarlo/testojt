define( function ( require ) {
	'use strict';

	require( 'slick' );
	require( 'jquery-browser' );
	require( 'common/views' );

	var $          = require( 'jquery' );
	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var config     = App.request( 'videoPlayer:config' );

	return Marionette.CollectionView.extend( {

		'itemView'  : App.Common.SegmentCardsView,

		'tagName'   : 'div',

		'className' : 'slick',

		'onShow' : function () {
			if ( $.browser.mobile ||  $.browser.ipad ) {
				this.$el.addClass( 'mobile' );
			}
			this.$el.slick( config.slick );
		},

		'onClose' : function () {
			this.collection.reset( [ ] );
		}

	} );

} );
