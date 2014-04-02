define( function ( require ) {
	'use strict';

	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	var userTags = require( 'apps/homepage/configuration/userDummyTagData' );
	var HomeView = require( 'apps/homepage/views/BaseItemView' );
	var NullView = require( 'apps/homepage/views/BaseEmptyView' );

	App.module( 'User.Home', function ( Home ) {

		// to show the user's personal info, grab the ClientPersonnel object
		function clientProfileParams( personnelId ) {
			return {
				'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelGateway',
				'method' : 'getById',
				'args'   : {
					'id' : personnelId
				}
			};
		}

		Home.Controller = {

			'showHome' : function () {
				if( Session.personnelId() && Session.personnelId() in userTags) {

					var fetchingModels = Remoting.fetch( [ clientProfileParams( Session.personnelId() ) ] );

					$.when( fetchingModels ).done( function ( models ) {
						App.reqres.setHandler( 'homepage:userProfile', function () {
							return models[0];
						} );

						App.reqres.setHandler( 'homepage:userTags', function () {
							return userTags[Session.personnelId()];
						} );
					App.content.show( new HomeView() );
					} ).fail( function ( error ) {
						App.content.show( new NullView() );
					} );

				} else {
					App.content.show( new NullView() );
				}
			}

		};

	} );

} );
