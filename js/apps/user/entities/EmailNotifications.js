define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );
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
				return {
					'objectPath' : 'core.ClientPersonnelEmailFlags',
					'method'     : 'update',
					'args'       : this.toJSON()
				};
			},

			'createEmailFlags' : function ( options ) {
				var data = {
					'objectPath' : 'core.ClientPersonnelEmailFlags',
					'path'       : 'core.ClientPersonnelEmailFlagsGateway',
					'method'     : 'create',
					'args'       : {
						'PersonnelId'          : Session.personnelId(),
						'SendCourseEmails'     : options.get( 'SendCourseEmails' ),
						'SendFollowUpEmails'   : options.get( 'SendFollowUpEmails' ),
						'SendForumEmails'      : options.get( 'SendForumEmails' ),
						'SendFriendEmails'     : 1,
						'SendGroupAdminEmails' : options.get( 'SendGroupAdminEmails' ),
						'SendGroupEmails'      : 1,
						'SendInternalMessages' : 1,
						'SendWallMessages'     : options.get( 'SendWallMessages' )
					}
				};

				return Remoting.fetch( data );
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
