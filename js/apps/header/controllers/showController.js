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

					var buildIcons = function () {
						var hasObsAccess = App.request( 'user:hasObsAccess' );
						var collection   = new Backbone.Collection( menuOptions.nav );

						// if they have access to observation, add the menu item
						if ( hasObsAccess ) {
							collection.add( menuOptions.observation, { 'at' : 2 } );
						} else {
							// add training icon instead
							collection.add( menuOptions.training, { 'at' : 4 } );
						}

						menu.icons.show( new IconsCollectionView( {
							'collection' : collection
						} ) );
					};

					if ( authenticated ) {

						App.when( App.request( 'messages:count' ) ).done( function ( count ) {

							menu.model.set( 'messageCount', count );

						} );

						var personnel = App.request( 'session:personnel' );

						// if personnel info has not been loaded wait for session initializtion
						if ( !personnel ) {
							Vent.once( 'session:initialized', buildIcons );
						} else {
							App.menu.show( menu );
							return buildIcons();
						}
					}

					// show the menu if not authenticated or waiting for session initialization
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
