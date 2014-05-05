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
				'slidesToScroll' : 4,
				'dots'           : true,
				'responsive'     : [ {
					'breakpoint' : 804,
					'settings'   : {
						'slidesToShow'   : 3,
						'slidesToScroll' : 3,
						'dots'           : true
					}
				}, {
					'breakpoint' : 604,
					'settings'   : {
						'slidesToShow'   : 2,
						'slidesToScroll' : 2,
						'dots'           : true
					}
				}, {
					'breakpoint' : 324,
					'settings'   : {
						'slidesToShow'   : 1,
						'slidesToScroll' : 1,
						'dots'           : true
					}
				}  ]
			} );
		},

		'onClose' : function () {
			this.collection.reset( [ ] );
		}

	} );

} );
