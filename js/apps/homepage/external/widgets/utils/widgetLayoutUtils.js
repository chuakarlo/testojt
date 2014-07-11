define( function ( require ) {
	'use strict';

	function setShown ( scrollLeft, self ) {
		if ( Math.abs( scrollLeft ) < 290 ) {
			self.$el.find( '.widget-specific:nth-child( 1 )' ).addClass( 'shown' ).siblings().removeClass( 'shown' );
		} else if ( Math.abs( scrollLeft ) >= 290 && Math.abs( scrollLeft ) < 580 ) {
			self.$el.find( '.widget-specific:nth-child( 2 )' ).addClass( 'shown' ).siblings().removeClass( 'shown' );
		} else {
			self.$el.find( '.widget-specific:nth-child( 3 )' ).addClass( 'shown' ).siblings().removeClass( 'shown' );
		}
	}

	function toggleRight ( self ) {
		if ( self.$el.find( '#active-widgets' ).scrollLeft() === ( self.$el.find( '#active-widgets ul' ).width() - self.$el.find( '#active-widgets' ).width() ) ) {
			self.$el.find( '#widget-nav.right' ).hide();
		} else {
			self.$el.find( '#widget-nav.right' ).show();
		}
	}

	function toggleLeft ( self ) {
		if ( self.$el.find( '#active-widgets' ).scrollLeft() === 0 ) {
			self.$el.find( '#widget-nav.left' ).hide();
		}
	}

	return {
		'doScrollLeft' : function  ( scrollLeft, self ) {
			setShown( scrollLeft, self );

			self.$el.find( '#widget-nav.left' ).show();

			toggleRight( self );
			toggleLeft( self );
		}
	};
} );
