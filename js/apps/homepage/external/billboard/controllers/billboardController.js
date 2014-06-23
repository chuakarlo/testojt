define( function ( require ) {
	'use strict';

	var App = require( 'App' );
	var $   = require( 'jquery' );

	var BillboardCollection = require( 'apps/homepage/external/billboard/collection/BillboardCollection' );
	var transformSliderData = require( 'apps/homepage/external/billboard/utilities/transformSliderData' );
	var nivoSetting         = require( 'apps/homepage/external/billboard/configuration/nivoSettings' );
	var LoadingView         = require( 'common/views/LoadingView' );

	var sliderSelector = '#slider';
	var scrollSelector = '.scrollable';

	var testClass = 'test';

	return {

		'doInitialize' : function ( itemView ) {
			var collection = new BillboardCollection();

			collection.fetch( {

				'success' : function ( collection ) {

					if ( App.request( 'homepage:isHomeRoute' ) ) {
						transformSliderData( collection.toJSON(), function ( res ) {
							itemView.images   = res.images;
							itemView.captions = res.captions;
							itemView.render();
							itemView.$el.find( '.spinner-container' ).remove();
						} );
					}
				},
				'error'   : function ( err ) {
					App.vent.trigger( 'flash:message', {
						'message' : err.message
					} );
				}
			} );
		},

		'doOnRender' : function ( view ) {

			var loading   = new LoadingView();
			var billboard = view.$el.find( sliderSelector );

			billboard.html( view.images );
			billboard.parent().append( view.captions );
			billboard.closest( '#billboard-container' ).prepend( ( loading ).render().el );
			loading.onShow();
			require( [ 'pc-nivo' ], function ( $ ) {
				$( billboard ).nivoSlider( nivoSetting() );
			} );
			$( view.$el.find( scrollSelector ) ).addClass( testClass );

		},

		'setTemplateHelpers' : function ( itemView ) {
			return {
				'id' : '1'
			};
		},

		'doRedirect' : function ( e ) {
			App.navigate( $( e.currentTarget ).attr( 'data-url' ), {
				'trigger' : true
			} );
		}
	};
} );
