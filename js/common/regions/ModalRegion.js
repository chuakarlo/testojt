define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var Marionette = require( 'marionette' );

	return Marionette.Region.extend( {

		'el' : '#modal-content',

		// The `constructor` function is used instead of `initialize` so if someone
		// extends this region, they'll override the `initialize` function with theirs
		'constructor' : function () {
			Marionette.Region.prototype.constructor.apply( this, arguments );

			// this is the Region's method for the caching the jQuery object for the
			// Regions element to `this.$el`.
			this.ensureEl();

			// `hidden.bs.modal` is fired by Twitter Bootstrap after it hides
			// the modal. Close the present view when that happens
			this.$el.on( 'hidden.bs.modal', _.bind( this.close, this ) );

			// focus on search input on modal shown
			this.$el.on( 'shown.bs.modal', _.bind( this.focusOnInput, this ) );
		},

		'focusOnInput' : function () {
			if ( !( $.browser.mobile || $.browser.ipad ) ) {
				this.$el.find( '.search-input' ).focus();
			}
		},

		// Overwrite show so we can capture aditional options. The view must
		// contain the class names from modal-dialog down.
		// http://getbootstrap.com/javascript/#modals
		'show' : function ( view, options ) {

			this.showOptions = options || { };

			// If a className attribute is passed in, add that to the region
			if ( this.showOptions.className ) {
				this.$el.addClass( this.showOptions.className );
			}

			if ( this.showOptions.backdrop ) {
				// fixed for flickering modal in android native browser
				this.$el.attr( 'data-backdrop', this.showOptions.backdrop );
			}
			// Call the original show method
			Marionette.Region.prototype.show.apply( this, arguments );
		},

		// show the modal with your desired
		'onShow' : function ( view ) {
			this.$el.modal( 'show', this.showOptions );
			if ( $.browser.mobile || $.browser.ipad ) {
			// set body position to fixed to prevent it from scrolling while modal is open
				$( 'body.modal-open' ).css( {
					'position' : 'fixed',
					'width'    : '100%'
				} );
			}
		},

		// close the share video modal dialog
		'onClose' : function () {
			// Remove the className from the modal region
			if ( this.showOptions.className ) {
				this.$el.removeClass( this.showOptions.className );
			}
			// Clear the options
			this.showOptions = { };

			this.$el.modal( 'hide' );

			$( '.modal-backdrop' ).remove();
			$( 'body.modal-open' ).css( { 'position' : '' } );
		}

	} );

} );
