define( function ( require ) {
	'use strict';

	var _           = require( 'underscore' );
	var Marionette  = require( 'marionette' );
	var Backbone    = require( 'backbone' );
	var Vent        = require( 'Vent' );
	var ModalLayout = require( 'common/views/ModalLayout');

	// main app
	var App          = new Marionette.Application();


	// set the regions of the app
	App.addRegions( {
		'content'      : '#main-content',
		'flashContent' : '#flash-content',
		'menu'         : '#navbar',
		'modalRegion'  : '#modal-content'
	} );

	// Allow sub apps to update history fragment when using events
	App.navigate = function ( route, options ) {
		options = options || {};
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

	// Modal Events
	App.vent.on( 'modal:show', function( options ) {
		// Options must contain some sort of view instance passed in as the
		// 'view' key. you can also pass in the arguments defined here
		// http://getbootstrap.com/javascript/#modals

		// Example:
		// App.vent.trigger( 'modal:show', {
		//		'view'       : modalView,
		//		'background' : true,
		//	} );

		// Pick out the options that might need to be passed directly to
		// the modal
		var modalOptions = _.pick(options, [
			'backdrop',
			'keyboard',
			'show',
			'remote'
		] );

		// options that might not have to do with the modal directly
		options = _.defaults( options, {
			'size' : 'modal-lg'
		} );

		var modalLayout = new ModalLayout( options );

		App.modalRegion.show( modalLayout );

		modalLayout.modalRegion.show( options.view );

		modalLayout.$el.modal( modalOptions );
		modalLayout.$el.modal( 'show' );

		// Listen for the modal to be closed and close the region
		modalLayout.$el.on( 'hidden.bs.modal', function() {
			App.modalRegion.close();
		} );


	} );

	return App;
} );
