define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var _        = require( 'underscore' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Personnel = Backbone.CFModel.extend( {

			'path' : 'core.ClientPersonnelGateway',

			'idAttribute' : 'PersonnelId',

			'getReadOptions' : function () {
				return {
					'method' : 'getCoverFlow',

					'args' : {
						'id' : Session.personnelId()
					}
				};
			},

			'getUpdateOptions' : function () {
				return {
					'method'     : 'update',
					'objectPath' : 'core.ClientPersonnel',
					'args'       : this.toJSON()
				};
			},

			'defaults' : {
				'PersonnelId'        : 0,
				'ClientId'           : '',
				'RoleTypeId'         : 0,
				'EmailAddress'       : '',
				'LoginName'          : '',
				'Password'           : '',
				'FirstName'          : '',
				'LastName'           : '',
				'Title'              : '',
				'Organization'       : '',
				'DistrictName'       : '',
				'State'              : '',
				'Country'            : '',
				'TimeZone'           : '',
				'WorkPhone'          : '',
				'ReferralCode'       : '',
				'SessionID'          : '',
				'PasswordReset'      : 0,
				'IsActivated'        : 0,
				'Activated'          : '',
				'Verified'           : '',
				'LastLogin'          : '',
				'LoginCount'         : 0,
				'SendFollowUpEmails' : 1,
				'UseWizards'         : 1,
				'LicenseAccepted'    : '',
				'LicenseInitials'    : '',
				'Created'            : '',
				'Creator'            : 0,
				'Modified'           : '',
				'Modifier'           : 0,
				'Removed'            : '',
				'Remover'            : 0,
				'Archived'           : '',
				'Archiver'           : 0,
				'EmployeeId'         : ''
			},

			'validation' : {

				'FirstName' : {
					'required'  : true,
					'maxLength' : 20
				},

				'LastName' : {
					'required'  : true,
					'maxLength' : 20
				},

				'EmailAddress' : [
					{
						'required' : true
					},
					{
						'pattern' : 'email',
						'msg'     : 'A valid email is required'
					},
					{
						'maxLength' : 128
					}
				]

			},

			'setupEulaValidation' : function () {

				this.validation = {
					'LicenseInitials' : {
						'required' : true,
						'msg'      : 'Initials are required'
					}
				};

			},

			'setupRegistrationValidation' : function () {

				_.extend( this.validation, {

					'Password' : {
						'required'  : true,
						'minLength' : 4,
						'maxLength' : 12
					},

					'Password2' : [
						{
							'required' : true,
							'msg'      : 'Re-typing password is required'
						},
						{
							'equalTo' : 'Password',
							'msg'     : 'Passwords are mismatched'
						}
					],

					'Country' : {
						'required' : true
					},

					'State' : {
						'required' : true
					},

					'DistrictName' : {
						'required' : true
					},

					'ClientId' : {
						'required' : true,
						'msg'      : 'School name is required'
					}

				} );
			},

			'setupForgotPasswordValidation' : function () {

				this.validation = {

					email : {

						'required' : true,
						'pattern'  : 'email',
						'msg'      : 'Invalid email address. Please enter a valid email address to continue (e.g. johnsmith@email.com)'
					}

				};

			}

		} );

		var API = {

			'getPersonnel' : function () {
				var defer = $.Deferred();

				var personnel = new Entities.Personnel();

				personnel.fetch( {

					'success' : function () {
						defer.resolve( personnel );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching personnel' ) );
					}

				} );

				return defer.promise();
			},

			'getUsersByEmailorUsername' : function ( email ) {

				var deferredRequest = $.ajax( {
					'url' : '/com/schoolimprovement/pd360/dao/RespondService.cfc?method=RespondGetUsersByEmailAddressOrLoginName&email=' + email
				} );

				return deferredRequest;
			}

		};

		App.reqres.setHandler( 'user:personnel', function () {
			return API.getPersonnel();
		} );

		App.reqres.setHandler( 'user:byEmail', function ( emailOrUsername ) {
			return API.getUsersByEmailorUsername( emailOrUsername );
		} );

	} );

} );
