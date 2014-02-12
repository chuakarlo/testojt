define( function ( require ) {
	'use strict';

	var CommunitiesShow = require( './show/showController' );
	var Vent            = require( 'Vent' );
	var Marionette      = require( 'marionette' );

	// ## Communities App
	return function ( Communities, App ) {

		// load communities
		App.module( 'Communities.Show', CommunitiesShow );

		// configure communities routes
		Communities.Router = Marionette.AppRouter.extend( {

			'appRoutes' : {
				'communities' : 'showCommunities'
			}

		} );

		var API = {

			'showCommunities' : function () {
				Communities.Show.Controller.showCommunities();
			}

		};

		App.addInitializer( function () {
			new Communities.Router( {
				'controller' : API
			} );
		} );

	};

} );
