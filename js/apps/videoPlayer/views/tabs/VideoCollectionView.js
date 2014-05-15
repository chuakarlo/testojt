define( function ( require ) {
	'use strict';

	var App           = require( 'App' );
	var Marionette    = require( 'marionette' );

	require( 'common/views' );
	require( 'slick' );

	return Marionette.CollectionView.extend( {

		'itemView'  : App.Common.SegmentCardsView,

		'tagName'   : 'ul',

		'className' : 'slick',

		'ui' : {
			'next' : 'button.slick-next',
			'prev' : 'button.slick-prev'
		},

		'onShow' : function () {
			this.$el.slick( {
				'slidesToShow'   : 4,
				'slidesToScroll' : 4,
				'dots'           : true,
				'responsive'     : [ {
					'breakpoint' : 804,
					'settings'   : {
						'slidesToShow'   : 3,
						'slidesToScroll' : 3,
						'arrows'         : false,
						'centerMode'     : true
					}
				},  {
					'breakpoint' : 490,
					'settings'   : {
						'slidesToShow'   : 1,
						'slidesToScroll' : 1,
						'arrows'         : false,
						'centerMode'     : true
					}
				} ]
			} );
		},

		'onClose' : function () {
			this.collection.reset( [ ] );
		}

	} );

} );
