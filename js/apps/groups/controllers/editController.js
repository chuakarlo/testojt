define( function ( require ) {
	'use strict';

	var Remoting = require( 'Remoting' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );
	var Vent     = require( 'Vent' );
	var _        = require( 'underscore' );

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

					App.vent.trigger( 'flash:message', {
						'message' : 'An error occurred. Please try again later.'
					} );

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

					App.vent.trigger( 'flash:message', {
						'message' : 'An error occurred. Please try again later.'
					} );

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

				App.when( fetchingData ).done( function ( results ) {

					Vent.trigger( 'group:removeGroupInvites', model );

				} ).fail( function ( error ) {

					App.vent.trigger( 'flash:message', {
						'message' : 'An error occurred. Please try again later.'
					} );

				} );
			},

			'acceptGroup' : function (model) {
				// Accept Group API insert here
				var checkLicenseRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.AdminService',
					'method' : 'checkLicenseByLicenseKey',
					'args'   : {
						'key' : model.attributes.SingleUseKey
					}
				};

				var getLicenseKeySingleUseObjectRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.core.LicenseKeySingleUseGateway',
					'method' : 'getByKey',
					'args'   : {
						'Key' : model.attributes.SingleUseKey
					}
				};

				var checkLicenseTypeIdRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.core.LicensesGateway',
					'method' : 'getById',
					'args'   : {
						'id' : model.attributes.LicenseId
					}
				};

				var redeemLicenseKeyRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.RespondService',
					'method' : 'RespondRedeemLicenseKey',
					'args'   : {
						'persId' : $.cookie( 'PID' ) || null
					}
				};

				var requests     = [ checkLicenseRequest, getLicenseKeySingleUseObjectRequest ];
				var fetchingData = Remoting.fetch( requests );
				App.when( fetchingData ).done( function ( results ) {
					var licenseKeySingleUseObject = results[ 1 ];
					_.extend(redeemLicenseKeyRequest.args, licenseKeySingleUseObject);

					if ( results[ 0 ] === 3 ) {
						var fetchingData = Remoting.fetch( checkLicenseTypeIdRequest );

						App.when( fetchingData ).done( function ( result ) {
							if ( result[ 0 ].LicenseTypeId === 300 &&  result[ 0 ].SharedAccounts === 0 ) {
								var fetchingData = Remoting.fetch( redeemLicenseKeyRequest );

								App.when( fetchingData ).done( function ( results ) {

									Vent.trigger( 'group:show', model );

								} ).fail( function ( error ) {

									App.vent.trigger( 'flash:message', {
										'message' : 'An error occurred. Please try again later.'
									} );

								} );
							}
						} ).fail( function ( error ) {

							App.vent.trigger( 'flash:message', {
								'message' : 'An error occurred. Please try again later.'
							} );

						} );
					}

				} ).fail( function ( error ) {

					App.vent.trigger( 'flash:message', {
						'message' : 'An error occurred. Please try again later.'
					} );

				} );
			}

		};

	} );

} );
