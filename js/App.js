define( function ( require ) {
	'use strict';

	var Marionette  = require( 'marionette' );
	var Backbone    = require( 'backbone' );
	var Vent        = require( 'Vent' );
	var ModalRegion = require( 'common/regions/ModalRegion');
	var FlashLayout = require( 'common/views/FlashLayout' );
	var $           = require( 'jquery' );

	// main app
	var App = new Marionette.Application();

	// Create and Add Modal Region
	var modalRegion = new ModalRegion();

	// set the regions of the app
	App.addRegions( {
		'menu'         : '#navbar',
		'footerRegion' : '#footer',
		'content'      : '#main-content',
		'flashContent' : '#flash-content',
		'flashMessage' : '#flash-message',
		'modalRegion'  : modalRegion
	} );

	// Allow sub apps to update history fragment when using events
	App.navigate = function ( route, options ) {
		options = options || { };
		Backbone.history.navigate( route, options );
	};

	App.getCurrentRoute = function () {
		return Backbone.history.fragment;
	};

	// start history after initialization.
	App.on( 'initialize:after', function () {
		if ( Backbone.history ) {
			Backbone.history.start();

			// If no fragment exists, load login
			if ( this.getCurrentRoute() === '' ) {
				Vent.trigger( 'login:show' );
			}
		}
	} );

	App.content.on( 'before:show', function ( view ) {
		App.flashMessage.close();
	} );

	App.vent.on( 'flash:message', function ( options ) {

		var flashLayout = new FlashLayout( {
			'message'   : options.message,
			'className' : 'flash-message-container ' + options.type
		} );

		App.flashMessage.show( flashLayout );

		// Setup auto close for everything that's not an error message
		if ( options.type !== 'error' ) {
			var wordsPerSecond = options.message.split( ' ' ).length * 300;
			var timeout        = options.timeout || Math.max( wordsPerSecond, 3500 );

			setTimeout( function () {

				flashLayout.closeView();

			}, timeout );
		}

	} );

	// convenience access for jquery methods
	App.when     = $.when;
	App.Deferred = $.Deferred;

	return App;
} );
