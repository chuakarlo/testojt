define(function(require) {
	'use strict';

	var BillboardCollection = require( 'apps/homepage/external/billboard/collection/BillboardCollection' );
	var transformSliderData = require( 'apps/homepage/external/billboard/utilities/transformSliderData' );
	var billboardData       = require( 'apps/homepage/external/billboard/configuration/billboardDummyData' );
	var nivoSetting         = require( 'apps/homepage/external/billboard/configuration/nivoSettings' );

	var sliderSelector  = '#slider';
	var captionSelector = '.nivo-caption';
	var scrollSelector  = '.scrollable';

	var testClass = 'test';

	return {

		'doInitialize' : function ( itemView ) {
			var collection = new BillboardCollection();
			collection.fetch( {
				'success' : function ( collection ) {
					transformSliderData( true ? collection.toJSON() : billboardData, function ( res ) {
						itemView.images   = res.images;
						itemView.captions = res.captions;
						itemView.render();
					} );
				}
			} );
		},

		'doOnRender' : function ( parent ) {
			require( [ 'pc-nivo' ], function ( $ ) {
					$( parent.$( sliderSelector ) ).nivoSlider( nivoSetting( $( parent.$( captionSelector ) ) ) );
				} );
				parent.$( scrollSelector ).addClass( testClass );
		},

		'setTemplateHelpers' : function ( itemView ) {
			return {
					'billboardImages'   : itemView.images,
					'billboardCaptions' : itemView.captions,
					'id'                : '1'
			};
		}
	};
});