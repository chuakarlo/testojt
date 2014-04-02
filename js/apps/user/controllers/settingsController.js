define( function ( require ) {
	'use strict';

	var App          = require( 'App' );
	var $            = require( 'jquery' );
	var SettingsView = require( 'user/views/settings/SettingsView' );

	App.module( 'User.Settings', function ( Mod ) {

		Mod.Controller = {

			'showSettings' : function ( page ) {
				// if navigating to `#settings`, redirect to `#settings/personal-info`
				if ( !page ) {
					page = 'personal-info';
					App.navigate( 'settings/personal-info' );
				}

				// show a loading view while data is fetching
				var loadingView = new App.Common.LoadingView();
				App.content.show( loadingView );

				var profileRequest   = App.request( 'user:profile' );
				var personnelRequest = App.request( 'user:personnel' );

				$.when( profileRequest, personnelRequest ).done( function ( profile, personnel ) {
					// new settings view with the desired sub page
					var settings = new SettingsView( { 'page' : page } );

					// set the models
					settings.setProfileModel( profile );
					settings.setPersonnelModel( personnel );

					// show the view
					App.content.show( settings );
				} ).fail( function ( error ) {
					// TODO: error handling
				} );

			}

		};

	} );

} );
