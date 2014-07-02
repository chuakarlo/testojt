define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var App = require( 'App' );

	var ActiveWidgetCompositeView = require( 'apps/homepage/external/active-widgets/views/ActiveWidgetCompositeView' );
	var carouselNavTemplate       = require( 'text!apps/homepage/external/active-widgets/templates/carouselNavTemplate.html' );

	return Marionette.CollectionView.extend( {
		'id'        : 'active-widgets',
		'className' : 'carousel-inner three-box-container',
		'itemView'  : ActiveWidgetCompositeView,
		'onShow'    : function () {
			var widgetSize = this.collection.widgetSize;

			if ( widgetSize !== 'lg' ) {
				this.$el.parent().append( _.template( carouselNavTemplate, { 'widgetSize' : widgetSize } ) );
				App.Homepage.Utils.carouselApplySettings( this.$el.closest( '.carousel' ) );
			}
		}
	} );
} );
