define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var $               = require( 'jquery' );
	var MAX_WIDGET_PEEK = 30;

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

/**
 * Adjust individual widget margin on different screen resolution if last Widget PEEK
 * percentage is less than 30%
 */

	function adjustWidgetMargin ( self ) {

		var nWidgetWid = $( '#active-widgets' ).width();
		var nItemWid   = self.$el.find( 'li.widget-specific:first' ).outerWidth();
		var nRemainder = nWidgetWid % nItemWid;
		var nPeek      = ( nRemainder > 0 ) ? (  ( nRemainder / nItemWid ) * 100 ) : 0;

		if ( nPeek < MAX_WIDGET_PEEK ) {
			var nActive    = Math.floor( nWidgetWid / nItemWid );
			self.$el.find( 'li.widget-specific' ).css( { 'margin' : '0 ' + ( nRemainder / ( nActive * 2 ) ) + 'px' } );
		}
	}

	return Marionette.CollectionView.extend( {

		'initialize' : function () {
			$( window ).resize( function () {
				adjustWidgetMargin( this );
			}.bind( this ) );
		},

		'tagName'   : 'ul',
		'itemView'  : UserWidgetItemView,
		'className' : 'active-widgets-container no-padding',

		'onShow'    : function () {

			adjustWidgetMargin( this );

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
