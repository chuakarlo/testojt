define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );

	var Router     = require( 'routers/AppRouter' );
	var Controller = require( 'controllers/AppController' );

	// Event aggregator
	var Vent = require( 'Vent' );

	var App = new Marionette.Application();

	App.addRegions( {
		'content' : '#main-content',
		'menu'    : '#navbar'
	} );

	App.addInitializer( function ( options ) {

		App.Controller = new Controller( {
			'App'     : App,
			'regions' : {
				'menu'    : App.menu,
				'content' : App.content
			},
			'Vent'    : Vent
		} );

		App.Router = new Router( { 'controller' : App.Controller } );

	} );

	App.on( 'initialize:after', function () {
		Backbone.history.start( { 'pushState' : false } );
	} );

	return App;
} );