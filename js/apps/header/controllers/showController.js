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

				var init = function ( helpUrl ) {

					var messageCount = new Backbone.Model( { 'messageCount' : 0 } );
					var menu         = new Menu( { 'authenticated' : authenticated, 'model' : messageCount } );

					if ( authenticated ) {

						App.when( App.request( 'messages:count' ) )

						.done( function ( count ) {

							menu.model.set( 'messageCount', count );

						} );

						this.listenToOnce( menu, 'show', function () {

							menu.icons.show( new App.Common.LoadingView( { 'text' : 'Loading Resources...' } ) );

							var collection = new Backbone.Collection( menuOptions.nav );

							if ( App.request( 'session:personnel' ) ) {

								if ( App.request( 'user:hasObsAccess' ) ) {
									collection.add( menuOptions.observation, { 'at' : 2 } );
								} else {
									collection.add( menuOptions.training, { 'at' : 4 } );
								}

								menu.icons.show( new IconsCollectionView( {
									'collection' : collection
								} ) );

							} else {

								// On refresh session:personnel doesn't exist immediately
								// Wait for session to be initialized then redirect
								Vent.on( 'session:initialized', function () {

									if ( App.request( 'user:hasObsAccess' ) ) {
										collection.add( menuOptions.observation, { 'at' : 2 } );
									} else {
										collection.add( menuOptions.training, { 'at' : 4 } );
									}

									menu.icons.show( new IconsCollectionView( {
										'collection' : collection
									} ) );

								}.bind( this ) );

							}

						} );

					}

					App.menu.show( menu );

				}.bind( this );

				if ( !authenticated ) {
					return init();
				}

				App.when( App.request( 'user:personnel' ) ).done( init ).fail( init );

			}

		} );

		Show.Controller = new Controller();

	} );

} );
