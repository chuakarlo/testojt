define( function ( require ) {
	'use strict';

	var Marionette           = require( 'marionette' );
	var MAX_WIDGET_PEEK      = 70;
	var MIN_WIDGET_PEEK      = 30;
	var MAX_ALLOWABLE_MARGIN = 10;

	var UserWidgetItemView      = require( 'apps/homepage/external/widgets/views/UserWidgetCompositeView' );
	var EmptyUserWidgetItemView = require( 'apps/homepage/external/widgets/views/EmptyUserWidgetItemView' );

	function addCarousel ( container, appendToID ) {
		require( [ 'pc-carouselSnap' ], function ( $ ) {
			$( container ).carouselSnap ( {
				nextID        : 'next-slide-' + appendToID,
				prevID        : 'previous-slide-' + appendToID,
				startOnCenter : false,
				rotate        : true,
				beforeShift   : function () {},
				afterShift    : function () {},
				onInitialize  : function () {
					container.show();
				}
			} );
		} );
	}

/**
 * Adjust individual widget margin on different screen resolution if last Widget PEEK
 * percentage is less than 30%
 */

	function adjustWidgetMargin ( container ) {
		require( [ 'pc-adjustablePeek' ], function ( $ ) {
			$( container ).adjustablePeek( {
				'containerId' : 'active-widgets',
				'itemClass'   : 'widget-specific',
				'minPeek'     : MIN_WIDGET_PEEK,
				'maxPeek'     : MAX_WIDGET_PEEK,
				'maxMargin'   : MAX_ALLOWABLE_MARGIN,
				'afterAdjust' : function () {
					addCarousel( container, 'active-widgets' );
				}
			} );
		} );
	}

	return Marionette.CollectionView.extend( {
		'tagName'   : 'ul',
		'itemView'  : UserWidgetItemView,
		'className' : 'active-widgets-container no-padding',

		'onBeforeRender' : function ( parent ) {

			this.$el.hide();

			var self  = this;
			var count = 3 - this.collection.length;

			for ( var i = 0; i < count; i ++ ) {
				var emptyUserWidgetItemView = new EmptyUserWidgetItemView();
				self.$el.append( emptyUserWidgetItemView.render().el );
			}
			adjustWidgetMargin( this.$el );
		}
	} );
} );
