define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.EmailNotification = Backbone.CFModel.extend( {

			'path' : 'core.ClientPersonnelEmailFlagsGateway',

			'idAttribute' : 'PersonnelId',

			'getReadOptions' : function () {
				return {
					'method' : 'getById',
					'args'   : {
						'id' : Session.personnelId()
					}
				};
			},

			'getUpdateOptions' : function () {
				var method = 'update';
				// If a user does not have any settings yet, you will need to create them
				if ( this.get( 'PersonnelId' ) === 0 ) {
					method = 'create';
					this.set( 'PersonnelId', Session.personnelId() );
				}
				return {
					'objectPath' : 'core.ClientPersonnelEmailFlags',
					'method'     : method,
					'args'       : this.toJSON()
				};
			}

		} );

	} );

	var API = {

		'getEmailFlags' : function () {
			var defer = $.Deferred();

			var emailFlags = new App.Entities.EmailNotification();

			emailFlags.fetch( {

				'success' : function () {
					defer.resolve( emailFlags );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching email flags' ) );
				}

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'user:emailNotifications', function () {
		return API.getEmailFlags();
	} );

} );
