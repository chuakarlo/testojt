define( function ( require ) {
	'use strict';

	var Menu = require( 'header/views/NavLayout' );
	var App  = require( 'App' );

	App.module( 'Header.Show', function ( Show ) {

		Show.Controller = {

			'showHeader' : function () {
				var menu = new Menu( { 'authenticated' : App.request( 'session:authenticated' ) } );
				App.menu.show( menu );
			}

		};

	} );

} );
