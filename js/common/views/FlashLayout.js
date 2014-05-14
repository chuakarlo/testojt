define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var template   = require( 'text!../templates/flashMessage.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'ui' : {
			'closeButton' : '.flash-close'
		},

		'events' : {
			'click @ui.closeButton' : 'closeView'
		},

		'initialize' : function ( options ) {
			this.message = options.message;
			this.timeout = options.timeout;
			this.type    = options.type;
		},

		'serializeData' : function () {
			return {
				'message' : this.message
			};
		},

		'onShow' : function ( ) {

			var wordsPerSecond = this.message.split( ' ' ).length * 300;
			var timeout        = this.timeout;

			if ( typeof timeout === 'undefined' ) {
				timeout = Math.max( wordsPerSecond, 3500 );
			}

			// Setup auto close for everything that's not an error message
			if ( this.type !== 'error' && timeout !== false ) {

				setTimeout( function () {

					this.closeView();

				}.bind( this ), timeout );
			}

			// affix with jquery as data-* didn't work in IE
			$( '#flash-message' ).affix( {
				'offset' : {
					'top' : 50
				}
			} );

			// slide the error message down
			this.$el.hide();
			this.$el.slideDown();

		},

		'closeView' : function () {
			this.close();
		}

	} );

} );
