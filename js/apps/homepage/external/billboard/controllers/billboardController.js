define( function ( require ) {
	'use strict';

	var App                 = require( 'App' );
	var $                   = require( 'jquery' );
	var _                   = require( 'underscore' );
	var BillboardCollection = require( 'apps/homepage/external/billboard/collection/BillboardCollection' );
	var transformSliderData = require( 'apps/homepage/external/billboard/utilities/transformSliderData' );
	var nivoSetting         = require( 'apps/homepage/external/billboard/configuration/nivoSettings' );
	var LoadingView         = require( 'common/views/LoadingView' );

	var sliderSelector = '#slider';
	var scrollSelector = '.scrollable';

	var testClass = 'test';
	var ITEMVIEW;

	function getImageDimension ( ) {
		var dimension   = 0;
		var windowWidth = window.innerWidth;
		if ( windowWidth < 320 || windowWidth < 600 ) {
			dimension = 320;
		} else if ( windowWidth >= 600 && windowWidth < 992 ) {
			dimension = 960;
		} else if ( windowWidth >= 992 && windowWidth < 1200 ) {
			dimension = 1200;
		}
		return dimension;
	}
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
						'message' : 'Billboard : ' + err.message
					} );
				}
			} );
		},

		'doOnRender' : function ( view ) {

			var loading = new LoadingView();
			var billboard = view.$el.find( sliderSelector );

			billboard.html( view.images );
			billboard.parent().append( view.captions );
			billboard.closest( '#billboard-container' ).prepend( ( loading ).render().el );
			loading.onShow();
			require( [ 'pc-nivo' ], function ( $ ) {
				$( billboard ).nivoSlider( nivoSetting() );
			} );
			$( view.$el.find( scrollSelector ) ).addClass( testClass );
			this.changeBillboardImage( view );
			ITEMVIEW = view;
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
		},

		'changeBillboardImage' : function ( view ) {
			var imageElements = view.$el.find( '.billimage' );
			var dimension     = getImageDimension();

			if ( dimension && $.browser.mobile ) {
				_.each( imageElements, function ( data ) {
					var url    = $( data ).attr( 'src' );
					var regex  = /(.*)\/(.*)\.(.*)/;
					var result = regex.exec( url );
					if ( result ) {
						var newurl = url.replace( result[ 2 ], dimension + '_' + result[ 2 ] );
						$( data ).attr( 'src', newurl  );
					}

				} );
			}
		}
	};
} );
