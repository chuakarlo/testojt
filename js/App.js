define( function ( require ) {
	'use strict';

	var Marionette  = require( 'marionette' );
	var Backbone    = require( 'backbone' );
	var Vent        = require( 'Vent' );
	var ModalRegion = require( 'common/regions/ModalRegion' );
	var FlashLayout = require( 'common/views/FlashLayout' );
	var $           = require( 'jquery' );

	// extends the marionette application
	require( 'plugins/Application' );

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

			// Add Catchall Handler
			Backbone.history.handlers.push( { 'route' : /(.*)/, 'callback' : function catchAllRouteHandler ( fragment ) {
				// If query params are sent redirect them to the SSO handler
				if ( window.location.search ) {

					var url = window.location.protocol + '//' + window.location.hostname;
					if ( window.location.port ) {
						url += ':' + window.location.port;
					}

					var queryParams = window.location.search;

					queryParams = queryParams.replace( /^\?/, '' );

					url += window.location.pathname + '#sso/' + queryParams;

					// replace the location url assuming sso params
					window.location.replace( url );
				}

				// Require login if they have not previously authenticated
				if ( App.request( 'session:authenticated' ) === false ) {

					Vent.trigger( 'login:show', fragment );
					return;

				}

				// If they have authenticated, and tried to access an unavailable route redirect home.
				if ( App.request( 'session:personnel' ) ) {

					App.navigate( 'home', { 'trigger' : true, 'replace' : true } );

					if ( fragment ) {
						App.errorHandler( { 'message' : 'Sorry, `' + fragment + '` is currently unavailable or does not exist.' } );
					}

					return;

				} else {

					// On login session:personnel doesn't exist immediately
					// Wait for session to be initialized then redirect
					Vent.on( 'session:initialized', function () {
						App.navigate( fragment, { 'trigger' : true, 'replace' : true } );
					}.bind( this ) );

					return;

				}

			} } );

			Backbone.history.start();

		}
	} );

	// Allows us to keep track of the controllers created and the ones not
	// getting destroyed properly. This leads to memory leaks.
	App.commands.setHandler( 'register:instance', function ( instance, id ) {
		App.register( instance, id );
	} );

	App.commands.setHandler( 'unregister:instance', function ( instance, id ) {
		App.unregister( instance, id );
	} );

	App.content.on( 'before:show', function ( view ) {
		App.modalRegion.close();
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

		// reset if passed in an error or caught window.error where typeof option !== 'object'
		if ( Object.prototype.toString.call( options ) === '[object Error]' || typeof options !== 'object' ) {
			options = { };
		}

		// setup defaults
		options  = options || { };
		if ( typeof callback !== 'function' ) {
			callback = function () {};
		}

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

	window.onerror = App.errorHandler;

	// convenience access for jquery methods
	App.when     = $.when;
	App.Deferred = $.Deferred;

	return App;
} );
