define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var Vent       = require( 'Vent' );

	var Menu                = require( 'header/views/NavLayout' );
	var IconsCollectionView = require( 'header/views/IconsCollectionView' );

	require( 'apps/messages/entities/Messages' );

	var menuOptions = require( 'resources/data/menus' );

	App.module( 'Header.Show', function ( Show ) {

		var Controller = Marionette.Controller.extend( {

			'showHeader' : function () {

				var authenticated = App.request( 'session:authenticated' );
				var messageCount  = new Backbone.Model( { 'messageCount' : 0 } );
				var menu          = new Menu( { 'authenticated' : authenticated, 'model' : messageCount } );

				this.listenTo( menu, 'show', function () {

					if ( authenticated ) {

						// This lets the home controller know this view is ready to display
						// the bootstro element
						App.vent.trigger( 'bootstro:itemLoaded' );

						menu.icons.show( new App.Common.LoadingView( { 'text' : 'Loading Resources...' } ) );

						if ( App.request( 'session:initialized' ) ) {
							personalizeHeader( menu );
						} else {

							// Wait for session to be initialized then redirect
							Vent.on( 'session:initialized', function () {
								personalizeHeader( menu );
							}.bind( this ) );

						}

					}

				} );

				App.navbarRegion.show( menu );

			}

		} );

		var personalizeHeader = function ( menu ) {

			// -----------------------
			// Update the resources based on observation access
			// -----------------------
			var collection = new Backbone.Collection( menuOptions.nav );

			if ( App.request( 'user:hasObsAccess' ) ) {
				collection.add( menuOptions.observation, { 'at' : 2 } );
			} else {
				collection.add( menuOptions.training, { 'at' : 4 } );
			}

			// The menu may not exist if logging in through SSO
			if ( menu.icons ) {
				menu.icons.show( new IconsCollectionView( {
					'collection' : collection
				} ) );
			}

			// -----------------------
			// Update the message count
			// -----------------------
			App.when( App.request( 'messages:count' ) )

			.done( function ( count ) {
				menu.model.set( 'messageCount', count );
			} );

		};

		Show.Controller = new Controller();

	} );

} );
