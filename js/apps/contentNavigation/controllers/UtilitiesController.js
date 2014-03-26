define( function( require ) {
	'use strict';

	var $ = require( 'jquery' );

	return {

		'throwError' : function ( message, name ) {
			var _error	= new Error( message );

			_error.name	= name || 'Error';

			throw _error;
		},

		'scrollIndicator' : {
			'init' : function ( obj ) {
				if ( $.isEmptyObject( obj ) ) {
					return;
				}

				var scrollingEl = obj.scrollingEl || null;
				var boxShadowEl = obj.boxShadowEl || null;
				var onCreate    = obj.onCreate    || null;

				this.onCreate( onCreate );

				scrollingEl.on( 'scroll' , function() {
					if ( $( this ).scrollTop() !== 0 ) {
						this.show( boxShadowEl );
					} else {
						this.hide( boxShadowEl );
					}
				}.bind( this ) );

			},

			'onCreate' : function ( fn ) {
				if ( $.isFunction( fn ) ) {
					fn();
				}
			},

			'show' : function ( el ) {
				if ( !el.hasClass( 'enable-scroll-indicator' ) ) {
			        el.addClass( 'enable-scroll-indicator' );
			    }
			},

			'hide' : function ( el ) {
				if ( el.hasClass( 'enable-scroll-indicator' ) ) {
			        el.removeClass( 'enable-scroll-indicator' );
			    }
			}
		}
	};

} );