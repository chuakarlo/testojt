define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var _        = require( 'underscore' );

	var Privilege = Backbone.CFModel.extend( {

		'getReadOptions' : function () {
			return {
				'method' : 'getUserPrivilegeTypes',
				'args'   : {
					'persId' : Session.personnelId()
				}
			};
		},

		'path' : 'AdminService',

		'isLibraryAdmin' : function () {
			return this.get( '0' ) > 0;
		},

		'isCourseAdmin' : function () {
			return this.get( '1' ) > 0;
		},

		'isCommunityAdmin' : function () {
			return this.get( '2' ) > 0;
		},

		'isGroupAdmin' : function () {
			return this.get( '3' ) > 0;
		},

		'isCatalogAdmin' : function () {
			return this.get( '4' ) > 0;
		},

		'isObservationAdmin' : function () {
			return this.get( '5' ) > 0;
		},

		'isTemplateCreator' : function () {
			return this.get( '6' ) > 0;
		},

		'isTemplateOwner' : function () {
			return this.get( '7' ) > 0;
		},

		'isTemplateObserver' : function () {
			return this.get( '8' ) > 0;
		},

		'isLumiBookAuthor' : function () {
			return this.get( '9' ) > 0;
		},

		'isAdmin' : function () {
			return this.isLibraryAdmin() || this.isCourseAdmin() || this.isCommunityAdmin() || this.isGroupAdmin() || this.isCatalogAdmin();
		}

	} );

	// the list of users privileges
	var privileges;
	var fetchingPrivileges = App.Deferred();

	var API = {

		'initializePrivileges' : function () {
			var privilege = new Privilege();

			privilege.fetch( {

				'success' : function () {
					privileges = privilege;
					fetchingPrivileges.resolve( privileges );
				},

				'error' : function () {
					privileges = null;
					fetchingPrivileges.reject( new Error( 'Error fetching privileges' ) );
				}
			} );

		},

		'getPrivileges' : function () {
			var state = fetchingPrivileges.state();

			if ( state === 'resolved' || state === 'rejected' ) {
				fetchingPrivileges = App.Deferred();
			}

			// if privileges were already fetched, return stored privileges
			if ( privileges ) {
				return fetchingPrivileges.resolve( privileges );
			}

			// privileges haven't been set, fetch them
			this.initializePrivileges();

			return fetchingPrivileges.promise();
		},

		'isUserAdmin' : function () {
			var defer = App.Deferred();

			var privilegesResponse = this.getPrivileges();
			var personnelRequest   = App.request( 'user:personnel' );

			App.when( privilegesResponse, personnelRequest ).done( function ( privileges, personnel ) {
				var hasPrivileges = privileges.isAdmin();
				var isSinetAdmin  = personnel.isSinetAdmin();

				var isAdmin = hasPrivileges || isSinetAdmin || privileges.isLumiBookAuthor();

				defer.resolve( isAdmin );
			} );

			return defer.promise();
		},

		// Check if the user has thereNow license
		'isThereNow' : function () {
			var defer = App.Deferred();

			var licenses = App.request( 'user:licenses' );

			App.when( licenses ).done( function ( licenses ) {

				var thereNowLicense = _.find( licenses.models, function ( license ) {
					return license.get( 'LicenseContentTypeId' ) === 138;
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
