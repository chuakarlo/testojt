define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Messages = Backbone.CFModel.extend( {

			'path' : 'friends.InternalMessagesGateway',

			'idAttribute' : 'personnelId',

			'getReadOptions' : function () {
				return {
					'method' : 'getUnreadCount',
					'args'   : {
						'id' : Session.personnelId()
					}
				};
			}

		} );

	} );

	var API = {

		'getMessages' : function () {
			var defer = $.Deferred();

			var messages = new App.Entities.Messages();

			messages.fetch( {

				'success' : function () {
					// the second argument is the response from the server which is a text/html type
					defer.resolve( arguments[ 1 ] );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching messages' ) );
				}

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'messages:count', function () {
		return API.getMessages();
	} );

} );
