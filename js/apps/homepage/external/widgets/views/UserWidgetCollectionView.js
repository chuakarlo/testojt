define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

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
				afterShift    : function () {}
			} );
		} );
	}

	return Marionette.CollectionView.extend( {
		'tagName'   : 'ul',
		'itemView'  : UserWidgetItemView,
		'className' : 'active-widgets-container no-padding',
		'onShow'    : function () {
			var self  = this;
			var count = 3 - this.collection.length;

			for ( var i = 0; i < count; i ++ ) {
				var emptyUserWidgetItemView = new EmptyUserWidgetItemView();
				self.$el.append( emptyUserWidgetItemView.render().el );
			}
			addCarousel( self.$el, 'active-widgets' );
		}
	} );
} );
