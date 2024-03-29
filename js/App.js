define( function ( require ) {
	'use strict';

	var Marionette  = require( 'marionette' );
	var Backbone    = require( 'backbone' );
	var Vent        = require( 'Vent' );
	var ModalRegion = require( 'common/regions/ModalRegion' );
	var FlashLayout = require( 'common/views/FlashLayout' );
	var _           = require( 'underscore' );
	var $           = require( 'jquery' );
	var Bugsnag     = window.Bugsnag;

	// extends the marionette application
	require( 'plugins/Application' );

	// main app
	var App = new Marionette.Application();

	// Create and Add Modal Region
	var modalRegion = new ModalRegion();

	// set the regions of the app
	App.addRegions( {
		'navbarRegion' : '#navbar',
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
				if ( App.request( 'session:initialized' ) ) {

					App.navigate( 'home', { 'trigger' : true, 'replace' : true } );

					if ( fragment ) {
						App.errorHandler( new Error( 'Sorry, the page "' + _.escape( fragment ) +  '" is currently unavailable or does not exist.' ) );
					}

					return;

				} else {

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
	App.errorHandler = function ( error, callback ) {
		var defaultMessage = 'An error occurred. Please try again later.';

		error = error || { };

		if ( typeof error === 'string' ) {
			error = { 'message' : error };
		}

		// create default message if undefined
		if ( !error.message ) {
			error.message = defaultMessage;
		}

		// Pass a region if you want an error view to show up in that region
		if ( error.region ) {
			error.viewText = error.viewText || 'There was an error loading view.';

			error.region.show( new App.Common.ErrorView( {
				'message' : error.viewText
			} ) );
		}

		Bugsnag.notifyException( error.error || error, error.message );

		if ( error.message.match( 'Uncaught' ) ) {
			error.message = defaultMessage;
		}

		// Set option.message = false to suppress flash message
		if ( error.message ) {
			App.vent.trigger( 'flash:message', {
				'message' : error.message
			} );
		}

		if ( typeof callback === 'function' ) {
			callback();
		}

	};

	if ( window.onerror ) {
		window.onerror = App.errorHandler;
	}

	// convenience access for jquery methods
	App.when     = $.when;
	App.Deferred = $.Deferred;

	return App;
} );
