define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var _        = require( 'underscore' );

	var Author = Backbone.CFModel.extend( {

		'getReadOptions' : function () {
			return {
				'method' : 'getByPersonnelId',
				'args'   : {
					'persId' : Session.personnelId()
				}
			};
		},

		'path' : 'livebook.AuthorGateway'

	} );

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
			var lumibookRequest    = App.request( 'user:isAuthor' );

			App.when( privilegesResponse, personnelRequest, lumibookRequest ).done( function ( privileges, personnel, isAuthor ) {
				var hasPrivileges = privileges.isAdmin();
				var isSinetAdmin  = personnel.isSinetAdmin();

				var isAdmin = hasPrivileges || isSinetAdmin || isAuthor;

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
		},

		'isAuthor' : function () {
			var defer = App.Deferred();

			var author = new Author();

			author.fetch( {

				'success' : function ( model, lumibooks ) {
					defer.resolve( lumibooks.length > 0 );
				},

				'error' : function () {
					defer.reject( 'An error occurred while fetching authored LumiBooks' );
				}
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

	App.reqres.setHandler( 'user:isAuthor', function () {
		return API.isAuthor();
	} );

} );
