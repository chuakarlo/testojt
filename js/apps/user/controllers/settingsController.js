define( function ( require ) {
	'use strict';

	var SettingsView = require( 'user/views/settings/SettingsView' );
	var $            = require( 'jquery' );
	var Remoting     = require( 'Remoting' );
	var Session      = require( 'Session' );
	var App          = require( 'App' );

	App.module( 'User.Settings', function ( UserSettings ) {

		UserSettings.Controller = {

			'showSettings' : function ( page ) {
				// if navigating to `#settings`, redirect to `#settings/personal-info`
				if ( !page ) {
					page = 'personal-info';
					App.navigate( 'settings/personal-info' );
				}
				
				// show a loading view while data is fetching
				var loadingView = new App.Common.LoadingView();
				App.content.show( loadingView );

				// to show the avatar picture, grab the ClientPersonnelProfile object
				var profileRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelProfileGateway',
					'method' : 'getById',
					'args'   : {
						'id' : Session.personnelId()
					}
				};

				// to show the user's personal info, grab the ClientPersonnel object
				var personnelRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelGateway',
					'method' : 'getById',
					'args'   : {
						'id' : Session.personnelId()
					}
				};

				var requests       = [ profileRequest, personnelRequest ];
				var fetchingModels = Remoting.fetch( requests );

				$.when( fetchingModels ).done( function ( models ) {
					// new settings view with the desired sub page
					var settings = new SettingsView( { 'page' : page } );

					// set the models
					settings.setProfileModel( models[ 0 ] );
					settings.setPersonnelModel( models[ 1 ] );

					// show the view
					App.content.show( settings );

				} ).fail( function ( error ) {
					// TODO: error handling
				} );

			}

		};

	} );

} );
