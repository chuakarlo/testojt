define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );

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
					var menu = new Menu( { 'authenticated' : authenticated, 'model' : messageCount } );

					if ( authenticated ) {

						App.when( App.request( 'messages:count' ) )

						.done( function ( count ) {

							menu.model.set( 'messageCount', count );

						} );

						this.listenToOnce( menu, 'show', function () {

							App.when( App.request( 'user:hasObsAccess' ) )

							.done( function ( hasAccess ) {
								var collection = new Backbone.Collection( menuOptions.nav );

								if ( hasAccess ) {
									collection.add( menuOptions.observation, { 'at' : 2 } );
								} else {
									collection.add( menuOptions.training, { 'at' : 4 } );
								}

								menu.icons.show( new IconsCollectionView( {
									'collection' : collection
								} ) );

							} )

							.fail( App.errorHandler.bind( App, {
								'region'  : menu.icons,
								'message' : 'There was an error getting available resources'
							} ) );

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
