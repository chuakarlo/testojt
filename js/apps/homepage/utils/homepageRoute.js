define( function () {
	'use strict';

	var App = require( 'App' );
	var Backbone = require( 'backbone' );

	App.reqres.setHandler( 'homepage:isHomeRoute', function () {
		return Backbone.history.fragment === 'home';
	} );
} );
