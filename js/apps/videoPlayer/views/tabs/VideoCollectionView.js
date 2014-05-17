define( function ( require ) {
	'use strict';

	require( 'slick' );

	var App           = require( 'App' );
	var Marionette    = require( 'marionette' );

	require( 'common/views' );

	return Marionette.CollectionView.extend( {

		'itemView'  : App.Common.SegmentCardsView,

		'tagName'   : 'div',

		'className' : 'slick',

		'ui' : {
			'next' : 'button.slick-next',
			'prev' : 'button.slick-prev'
		},

		'onShow' : function () {
			this.$el.slick( {
				'slidesToShow'   : 4,
				'slidesToScroll' : 4,
				'arrows'         : true,
				'slide'          : 'li',
				'slickWidth'     : 1140,
				'responsive'     : [ {
					'breakpoint' : 1100,
					'settings'   : {
						'slidesToShow'   : 4,
						'slidesToScroll' : 3,
						'touchThreshold' : 10,
						'slide'          : 'li',
						'arrows'         : false,
						'slickWidth'     : 1140
					}
				}, {
					'breakpoint' : 780,
					'settings'   : {
						'slidesToShow'   : 4,
						'slidesToScroll' : 2,
						'touchThreshold' : 10,
						'slide'          : 'li',
						'arrows'         : false,
						'slickWidth'     : 1140
					}
				}, {
					'breakpoint' : 450,
					'settings'   : {
						'slidesToShow'   : 4,
						'slidesToScroll' : 1,
						'touchThreshold' : 10,
						'slide'          : 'li',
						'arrows'         : false,
						'slickWidth'     : 1140
					}
				} ]
			} );
		},

		'onClose' : function () {
			this.collection.reset( [ ] );
		}

	} );

} );
