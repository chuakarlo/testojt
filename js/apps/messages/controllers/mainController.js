define( function ( require ) {
	'use strict';

	var App          = require( 'App' );
	var MessagesView = require( 'apps/messages/views/MessagesView' );

	App.module( 'Messages.Main', function ( Main ) {

		Main.controller = {
			'showMessages' : function () {
				var msgCollection = new App.Entities.Notifications();
				msgCollection.fetch( {
					'success' : function ( collection ) {
						if ( App.getCurrentRoute() === 'messages' ) {
							App.content.show( new MessagesView( {
								'collection' : collection
							} ) );
						}
					}
				} ).fail( function ( error ) {
					App.content.show( new App.Common.ErrorView( {
						'message' : 'There was an error in fetching notifications.',
						'flash'   : 'An error occurred. Please try again later.'
					} ) );
				} );
			}

		};

	} );

} );
