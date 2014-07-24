define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Notifications = Backbone.CFCollection.extend( {

			'path' : 'friends.InternalMessagesGateway',

			'getReadOptions' : function () {
				return {
					'method' : 'getInbox',
					'args'   : {
						'id'       : Session.personnelId(),
						'startRow' : 0,
						'numRows'  : 25,
						'filter'   : ''
					}
				};
			},

			'changeSortBy' : function ( sort ) {
				this.comparator = this.strategies[ sort ];
			},

			'strategies' : {
				'date'   : function ( message ) {
					var date = new Date( message.get( 'Created' ) );
					return - date.setDate( date.getDate() );
				},
				'sender' : 'CreatorFullName'
			},

			'comparator' : function ( message ) {
				return this.strategies.date( message );
			}

		} );

	} );

	var API = {

		'getMessages' : function () {
			var defer = $.Deferred();

			var notifications = new App.Entities.Notifications();

			notifications.fetch( {

				'success' : function () {
					defer.resolve( notifications );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching notifications' ) );
				}

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'notification:inbox', function () {
		return API.getMessages();
	} );

} );
