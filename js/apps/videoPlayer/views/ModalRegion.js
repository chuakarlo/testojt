define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	return Marionette.Region.extend( {

		'el' : '#app-modal',

		// The `constructor` function is used instead of `initialize` so if someone
		// extends this region, they'll override the `initialize` function with theirs
		'constructor' : function () {
			Marionette.Region.prototype.constructor.apply( this, arguments );

			// this is the Region's method for the caching the jQuery object for the
			// Regions element to `this.$el`.
			this.ensureEl();

			// `hidden.bs.modal` is fired by Twitter Bootstrap after it hides the modal
			this.$el.on( 'hidden.bs.modal', { 'region' : this }, this.closeRegion );
		},

		'closeRegion' : function ( evt ) {
			evt.data.region.close();
		},

		// show the share video modal dialog
		'onShow' : function ( view ) {
			this.$el.modal( 'show' );
		},

		// close the share video modal dialog
		'onClose' : function() {
			this.$el.modal( 'hide' );
		}

	} );

} );