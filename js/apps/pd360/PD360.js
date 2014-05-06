define( function ( require ) {
	'use strict';

	var App  = require( 'App' );
	var Vent = require( 'Vent' );

	require( 'pd360/controller/pd360Controller' );

	App.module( 'PD360', function ( PD360, App ) {

		var API = {

			'embed' : function () {
				PD360.Show.Controller.embed();
			},

			'navigate' : function ( main, sub, options ) {
				PD360.Show.Controller.navigate( main, sub, options );
			},

			'show' : function () {
				PD360.Show.Controller.show();
			},

			'hide' : function () {
				PD360.Show.Controller.hide();
			},

			'applicationComplete' : function () {
				PD360.Show.Controller.applicationComplete();
			},

			'loginComplete' : function () {
				PD360.Show.Controller.loginComplete();
			},

			'login' : function ( username, password ) {
				PD360.Show.Controller.login( username, password );
			},

			'logout' : function () {
				PD360.Show.Controller.logout();
			},

			'embedComplete' : function ( success ) {
				PD360.Show.Controller.embedComplete( success );
			},

			'available' : function () {
				return PD360.Show.Controller.available();
			},

			'signature' : function ( method, args ) {
				return PD360.Show.Controller.signature( method, args );
			},

			'loaded' : function () {
				return PD360.Show.Controller.loaded();
			}

		};

		App.reqres.setHandler( 'pd360:loaded', API.loaded );

		App.reqres.setHandler( 'pd360:available', API.available );

		App.reqres.setHandler( 'pd360:signature', API.signature );

		App.reqres.setHandler( 'pd360:navigate', API.navigate );

		App.reqres.setHandler( 'pd360:logout', API.logout );

		App.reqres.setHandler( 'pd360:login', API.login );

		App.reqres.setHandler( 'pd360:show', API.show );

		App.reqres.setHandler( 'pd360:hide', API.hide );

		Vent.on( 'embed:complete', API.embedComplete );

		Vent.on( 'login:success', API.embed );

		// initialize PD360 swf on creation if authenticated
		PD360.once( 'start', function () {
			if ( App.request( 'session:authenticated' ) ) {
				API.embed();
			}
		} );

	} );

} );
