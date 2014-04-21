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

	App.vent.on( 'flash:message', function ( options ) {
		var message = options.message;
		var timeout = options.timeout || 3500;

		if ( options.type ) {
			$( App.flashMessage.el ).addClass( options.type );
		}

		var flashLayout = new FlashLayout( { 'message' : message } );

		$( App.flashMessage.el ).removeClass( 'hidden' );

		App.flashMessage.show( flashLayout );

		setTimeout( function () {
			
			if ( options.type ) {
				$( App.flashMessage.el ).removeClass( options.type );
			}

			$( App.flashMessage.el ).addClass( 'hidden' );

			App.flashMessage.close();

		}, timeout );

	} );

	return App;
} );
