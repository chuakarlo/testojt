define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var _        = require( 'underscore' );

	var Privilege = Backbone.CFModel.extend( {

		'isLibraryAdmin' : function () {
			return this.get( 'hierarchyPrivileges' ) > 0;
		},

		'isCourseAdmin' : function () {
			return this.get( 'coursePrivileges' ) > 0;
		},

		'isCommunityAdmin' : function () {
			return this.get( 'communityModerators' ) > 0;
		},

		'isGroupAdmin' : function () {
			return this.get( 'groupPrivileges' ) > 0;
		},

		'isCatalogAdmin' : function () {
			return this.get( 'catalogPrivilege' ) > 0;
		},

		'isObservationAdmin' : function () {
			return this.get( 'observationPrivilege' ) > 0;
		},

		'isTemplateCreator' : function () {
			return this.get( 'templateCreator' ) > 0;
		},

		'isTemplateOwner' : function () {
			return this.get( 'templateOwner' ) > 0;
		},

		'isTemplateObserver' : function () {
			return this.get( 'templateObserver' ) > 0;
		},

		'isLumiBookAuthor' : function () {
			return this.get( 'lumibook' ) > 0;
		},

		'isAdmin' : function () {
			return this.isLibraryAdmin() || this.isCourseAdmin() || this.isCommunityAdmin() || this.isGroupAdmin() || this.isCatalogAdmin();
		}

	} );

	var API = {

		'getPrivileges' : function () {
			var privilege = new Privilege( App.request( 'session:privilege' ) );

			privilege.isSinetAdmin = function () {
				return App.request( 'session:personnel' ).RoleTypeId === 3;
			};

			return privilege;
		},

		'isUserAdmin' : function () {

			var privileges    = this.getPrivileges();
			var hasPrivileges = privileges.isAdmin();

			return hasPrivileges || privileges.isSinetAdmin() || privileges.isLumiBookAuthor();

		},

		'isThereNow' : function () {

			var licenses = App.request( 'session:license' );

			var thereNowLicense = _.find( licenses.models, function ( license ) {
				return license.get( 'LicenseContentTypeId' ) === 138;
			} );

			return thereNowLicense;

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
