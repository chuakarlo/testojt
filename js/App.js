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

		options.type      = ( options.type || 'error' );
		options.className = 'flash-message-container ' + options.type;

		var flashLayout = new FlashLayout( options );

		App.flashMessage.show( flashLayout );

	} );

	// error handler, to create flash messages, and optional error view
	App.errorHandler = function ( options, callback ) {

		// overwrite message if it was passed in an error
		if ( Object.prototype.toString.call( options ) === '[object Error]' ) {
			options = { };
		}

		// setup defaults
		options  = options || { };
		callback = callback || function () {};

		// create default message if undefined
		if ( typeof options.message === 'undefined' ) {
			options.message = 'An error occurred. Please try again later.';
		}

		// Pass a region if you want an error view to show up in that region
		if ( options.region ) {
			options.viewText = options.viewText || 'There was an error loading view.';

			options.region.show( new App.Common.ErrorView( {
				'message' : options.viewText
			} ) );
		}

		// Set option.message = false to suppress flash message
		if ( options.message ) {
			App.vent.trigger( 'flash:message', {
				'message' : options.message
			} );
		}

		callback();

	};

	// convenience access for jquery methods
	App.when     = $.when;
	App.Deferred = $.Deferred;

	return App;
} );
