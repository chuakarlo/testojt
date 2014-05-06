define( function ( require ) {
	'use strict';

	var Remoting = require( 'Remoting' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );
	var Vent     = require( 'Vent' );

	App.module( 'Groups.Edit', function ( Edit ) {

		Edit.Controller = {

			'leaveGroup' : function ( model ) {

				// leave public group
				var leaveGroupRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.AdminService',
					'method' : 'returnASeatToLicense',
					'args'   : {
						'persId'    : $.cookie( 'PID' ) || null,
						'licId'     : model.attributes.LicenseId,
						'removerId' : model.attributes.Creator
					}
				};

				var requests     = [ leaveGroupRequest ];
				var fetchingData = Remoting.fetch( requests );

				App.when( fetchingData ).done( function ( results ) {

					App.navigate( 'groups', { 'trigger' : true } );

				} ).fail( function ( error ) {
					// TODO: error handling
				} );

			},

			'joinGroup' : function ( model ) {

				// join public group
				var joinGroupRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.AdminService',
					'method' : 'takeASeatFromLicense',
					'args'   : {
						'persId'    : $.cookie( 'PID' ) || null,
						'licId'     : model.attributes.LicenseId,
						'creatorId' : model.attributes.Creator
					}
				};

				var requests     = [ joinGroupRequest ];
				var fetchingData = Remoting.fetch( requests );

				App.when( fetchingData ).done( function ( results ) {

					App.navigate( 'groups', { 'trigger' : true } );

				} ).fail( function ( error ) {
					// TODO: error handling
				} );

			},

			'ignoreGroup' : function (model) {
				var ignoreGroupRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
					'method' : 'deleteInviteByLicenseIdCreatorIdAndInviteeEmail',
					'args'   : {
						'LicenseId'    : model.attributes.LicenseId,
						'CreatorId'    : model.attributes.Creator,
						'InviteeEmail' : model.attributes.InviteeEmail
					}
				};

				var requests     = [ ignoreGroupRequest ];
				var fetchingData = Remoting.fetch( requests );

				$.when( fetchingData ).done( function ( results ) {

					Vent.trigger( 'group:removeGroupInvites', model );

				} ).fail( function ( error ) {
					// TODO: error handling
				} );
			},

			'acceptGroup' : function (model) {
				// Accept Group API insert here
			}

		};

	} );

} );
