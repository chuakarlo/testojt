define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );
	var _        = require( 'underscore' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Privilege = Backbone.CFModel.extend( {

			'getReadOptions' : function () {
				return {
					'method' : 'getUserPrivilegeTypes',
					'args' : {
						'persId' : Session.personnelId()
					}
				};
			},

			'path' : 'AdminService'

		} );

		Entities.PrivilegeCollection = Backbone.CFCollection.extend( {

			'getReadOptions' : function () {
				return {
					'method' : 'getUserPrivilegeTypes',
					'args' : {
						'persId' : Session.personnelId()
					}
				};
			},

			'path' : 'AdminService',

			'model' : Entities.Privilege

		} );

		// the list of users privileges
		var privileges;
		var fetching = false;

		var API = {

			'initializePrivileges' : function ( defer ) {

				// if currently fetching privileges
				if ( fetching ) {
					return defer.promise();
				}

				fetching = true;

				privileges = new Entities.Privilege();

				privileges.fetch( {

					'success' : function () {
						fetching = false;
						defer.resolve( privileges );
					},

					'error' : function () {
						fetching   = false;
						privileges = null;
						defer.reject( new Error( 'Error fetching privileges' ) );
					}
				} );

			},

			'getPrivileges' : function () {
				var defer = $.Deferred();

				// if privileges were already fetched, return stored privileges
				if ( privileges ) {
					return defer.resolve( privileges );
				}

				// privileges haven't been set, fetch them
				this.initializePrivileges( defer );

				return defer.promise();
			},

			'isUserAdmin' : function () {
				var defer = $.Deferred();

				var privilegesResponse = this.getPrivileges();

				$.when( privilegesResponse ).done( function ( response ) {

					$.each( response.attributes, function ( index, value ) {
						if ( value > 0 ) {
							defer.resolve( true );
							return false;
						}
					});

					defer.resolve( false );
				} );

				return defer.promise();
			},

			// Check if the user has thereNow license
			'isThereNow' : function () {

				var defer = $.Deferred();

				var licenses = App.request( 'user:licenses' );

				$.when( licenses ).done( function( licenses ) {

					var thereNowLicense = _.find( licenses.models, function ( license ) {
						return license.attributes.LicenseContentTypeId === 138;
					} );

					defer.resolve( thereNowLicense );

				} );

				return defer.promise();

			}

		};

		App.reqres.setHandler( 'user:privileges', function () {
			return API.getPrivileges();
		} );

		App.reqres.setHandler( 'user:isAdmin', function () {
			return API.isUserAdmin();
		} );

		App.reqres.setHandler( 'user:isThereNow', function () {
			return API.isThereNow();
		} );

	} );

} );
