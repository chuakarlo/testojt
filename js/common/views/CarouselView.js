define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	// Carousel plugin
	require( 'owl.carousel' );
	require( 'owl.navigation' );

	// From Marionette helpers
	function throwError ( message, name ) {
		var error = new Error( message );
		error.name = name || 'Error';
		throw error;
	}

	// Maybe monad
	function maybe ( fn ) {
		return function () {
			if ( arguments === void 0 ) {
				return;
			}
			fn.apply( this, arguments );
		};
	}

	// Options that should be same for all carousel and should not be overriden.
	var banOptions = [ 'responsive', 'URLhashListener' ];

	/**
	 * CarouselView class for Edivation
	 *
	 * Extend this class if you're going to use a carousel UI.
	 *
	 * Example:
	 *
	 * var CarouselView = require( 'App' ).Common.CarouselView;
	 *
	 * return CarouselView.extend( {
	 *     // Your template should have a class .owl-carousel for styling to take effect.
	 *     'template' : ...
	 *     // Pass options for carousel.
	 *     'carouselOptions' : {
	 *     },
	 *     // Define this method and return the element to be used by the carousel
	 *     'getCarouselEl' : function () {
	 *         // return this.el;
	 *         // you could also define the carousel element in the ui object
	 *         return this.ui.carousel;
	 *     }
	 * } );
	 *
	 */

	return Marionette.CompositeView.extend( {

		// Default options for edivation carousels.
		// If you need to change or add options refer to http://www.owlcarousel.owlgraphic.com/docs/api-options.html.
		// Please consult me=@sydcanem if you need to change settings below.
		'defaults' : {
			'URLhashListener' : false,
			'loop'            : false,
			'margin'          : 0,
			'autoWidth'       : true,
			'dots'            : false,
			'nav'             : true,
			'touchDrag'       : true,
			'info'            : true,
			'navText'         : [ '', '' ],
			'responsive'      : {
				// Smartphones portrait
				'320' : {
					'items'   : 1,
					'slideBy' : 1
				},
				// Smartphones landscape
				'550' : {
					'items'   : 2,
					'slideBy' : 1
				},
				// Tabs portrait
				'620' : {
					'items'   : 2,
					'slideBy' : 2
				},
				// Tabs landscape
				'780' : {
					'items'   : 3,
					'slideBy' : 2
				},
				// Desktop partially resized
				'1024' : {
					'items'   : 3,
					'slideBy' : 3
				},
				// Desktop maximized
				'1140' : {
					'items'   : 4,
					'slideBy' : 4
				}
			}
		},

		'constructor' : function () {
			this.listenTo( this, 'show:carousel', this.initCarousel );

			Marionette.CompositeView.prototype.constructor.apply( this, arguments );
		},

		'initCarousel' : function () {
			this._options = _.extend( {}, this.defaults,
				_.omit( Marionette.getOption( this, 'carouselOptions' ), banOptions ) );
			this._setVars();
			this._attachCarousel();
		},

		// Convenience next method
		'next' : function ( speed ) {
			this.carouselEl.trigger( 'next.owl.carousel', speed );
		},

		// Convenience previous method
		'prev' : function ( speed ) {
			this.carouselEl.trigger( 'prev.owl.carousel', speed );
		},

		'onClose' : function () {
			if ( this.carouselEl ) {
				this.carouselEl.trigger( 'destroy.owl.carousel' );
			}
		},

		'_setVars' : function () {
			// When carousel is set to loop = true, 'responsive' properties should be increased by 1.
			var keyVars = [ 'items', 'slideBy' ];

			// Increase keyVars options in responsive.
			if ( this._options.loop ) {
				_.each( this._options.responsive, function ( obj )  {
					keyVars.forEach( function ( prop ) {
						obj[ prop ] += 1;
					} );
				} );
			}

			// Disable responsive view options if 'itemsToShow' is 1 and set items to 1.
			if ( this._options.itemsToShow === 1 ) {
				this._options.items = 1;
				this._options.responsive = {};
			}
		},

		'_attachCarousel' : function () {
			var el = Marionette.getOption( this, 'carouselEl' ) || this.getCarouselEl();

			// Save a direct access to the initialized carousel.
			this.carouselEl = this._getElement( el, 'carouselEl' );
			// Bind events
			this._bindEvents();
			// Initialize carousel.
			this.carouselEl.owlCarousel( this._options );
		},

		// Listen to owl carousel events. Add more events if necessary.
		'_bindEvents' : function () {
			this.carouselEl.on( 'initialized.owl.carousel', this._onInitialized );
			this.carouselEl.on( 'translated.owl.carousel',  this._onTranslated );
			this.carouselEl.on( 'refreshed.owl.carousel',   this._showHideControls );
			this.carouselEl.on( 'resized.owl.carousel',     this._showHideControls );
		},

		'_onInitialized' : function ( data ) {
			this._showHideControls( data );
			this.afterCarouselInitialized( data );
		},

		'_onTranslated' : function ( data ) {
			this._showHideControls( data );
			this.afterCarouselMoved( data );
		},

		// This checks if "next" and "previous" UI should be shown or hidden ( not handled by owlcarousel ).
		'_showHideControls' : maybe( function ( data ) {
			var count    = data.item.count; // number of carousel items
			var page     = data.item.index; // current index
			var settings = data.relatedTarget.settings; // current settings used by carousel
			var plugins  = data.relatedTarget.plugins; // carousel plugins

			var next = this._getControls( 'next',  plugins.navigation.controls );
			var prev = this._getControls( 'prev',  plugins.navigation.controls );

			// Reset controls to show state.
			next.show();
			prev.show();

			// We're at the last page. Hide "next" UI.
			if ( ( count - page )  <= settings.items ) {
				next.hide();
			}

			// Check for 0 and 1 due to inconsistencies in how owl is calculating the first page.
			if ( page === 0 || page === 1 ) {
				prev.hide();
			}
		} ),

		'_getControls' : function ( nav, controls ) {
			switch ( nav ) {
				case 'next' :
					// Check if we're setting our own DOM for navigation
					if ( this._options.controls && this._options.controls.next ) {
						return this._getElement( this._options.controls.next, 'next' );
					} else {
						return controls.$next;
					}
					break;
				case 'prev' :
					if ( this._options.controls && this._options.controls.prev ) {
						return this._getElement( this._options.controls.prev, 'prev' );
					} else {
						return controls.$previous;
					}
					break;
				default : {
					return;
				}
			}
		},

		'_getElement' : function ( elem, name ) {
			if ( typeof elem === 'string' ) {
				elem = this.$el.find( elem );
			}

			if ( !elem || ( elem.length === 0 ) ) {
				throwError( 'Element "' + name + '" is missing. ', 'commons/CarouselView' );
				return;
			}

			return $( elem );
		},

		/**
		 * Override with your own implementation.
		 */
		'afterCarouselInitialized' : function ( data ) {},
		'afterCarouselMoved' : function ( data ) {},

		// All objects that extends this class should override this function.
		'getCarouselEl' : function () {}

	} );

} );
