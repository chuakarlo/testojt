define( function ( require ) {
	'use strict';

	require( 'slick' );

	var Marionette = require( 'marionette' );

	var VideoItemView = require( 'videoPlayer/views/tabs/VideoItemView' );

	return Marionette.CollectionView.extend( {

		'itemView'  : VideoItemView,

		'tagName'   : 'div',

		'className' : 'slick',

		'ui' : {
			'next' : 'button.slick-next',
			'prev' : 'button.slick-prev'
		},


		'onShow' : function () {
			this.$el.slick( {
				'slidesToShow'   : 4,
				'slidesToScroll' : 4
			} );
		},

		'onClose' : function () {
			this.collection.reset( [ ] );
		}

	} );

} );
