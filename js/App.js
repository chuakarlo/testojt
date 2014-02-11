define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var modularize = require( './modules' );

	// main app
	var App = new Marionette.Application();

	// set the regions of the app
	App.addRegions( {
		'content'      : '#main-content',
		'flashContent' : '#flash-content',
		'menu'         : '#navbar'
	} );

	// load modules
	modularize( App );

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
				App.trigger( 'login:show' );
			}
		}
	} );

	return App;
} );
