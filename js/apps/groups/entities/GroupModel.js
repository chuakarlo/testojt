define( function ( require ) {
	/**
	* @file
	* A Backbone Model that represents a Group.
	*/
	'use strict';

	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var Remoting = require( 'Remoting' );
	var App      = require( 'App' );
	var Session  = require( 'Session' );

	require( 'groups/entities/GroupMemberCollection' );
	require( 'groups/entities/GroupResourcesCollection' );
	require( 'groups/entities/GroupLinksCollection' );
	require( 'groups/entities/GroupResourceThreadModel' );
	require( 'groups/entities/GroupResourceThreadPostModel' );
	require( 'groups/entities/GroupResourceFileModel' );
	require( 'groups/entities/GroupResourceLinkModel' );
	require( 'groups/entities/GroupNewsEntryModel' );

	App.module( 'Entities', function ( Mod ) {

		Mod.GroupModel = Backbone.CFModel.extend( /** @lends App.Entities.GroupModel# */ {
			/**
			* The location of the server endpoint
			* @member {String} path
			*/
			'path' : 'GroupService',

			/**
			* The default attributes that represent a group
			* @member {Object} defaults
			*/
			'defaults' : {
				'Activated'            : 0,
				'AdminPersonnelId'     : 0,
				'AllowCustomCourse'    : 0,
				'Avatar'               : '',
				'BrandingImage'        : '',
				'CanVerify'            : 0,
				'CertificateFileName'  : '',
				'ContactEmailAddress'  : '',
				'ContactName'          : '',
				'ContactPhone'         : '',
				'Created'              : '',
				'Creator'              : '',
				'EmailDomain'          : '',
				'ExpireDate'           : '',
				'GroupLeaderLabel'     : '',
				'Hidden'               : 0,
				'LicenseContentTypeId' : 0,
				'LicenseId'            : 0,
				'LicenseKey'           : '',
				'LicenseName'          : '',
				'LicenseTypeId'        : 300,
				'LiveBookId'           : 0,
				'MembershipLength'     : 0,
				'Misc'                 : '',
				'Modified'             : '',
				'Modifier'             : 0,
				'MoreInfoURL'          : '',
				'NumberOfSeats'        : -1,
				'Objectives'           : '',
				'OrganizationName'     : '',
				'PrivateGroup'         : 0,
				'Removed'              : '',
				'Remover'              : 0,
				'SharedAccounts'       : 0,
				'StartDate'            : '',
				'State'                : '',
				'SyllabusFileName'     : '',
				'SyllabusURL'          : '',
				'TemplateId'           : 0,
				'UseGuidebooks'        : 0,
				'UserPrintCert'        : 0,
				'UseVJEServer'         : 0,
				'WelcomeMessage'       : ''
			},

			/**
			* A property to track the value of the last call to {userIsGroupMember}
			* @member {Boolean} isMember
			*/
			'isMember' : false,

			/**
			* Define the method called on the server to fetch a group and the
			* arguments required for the supplied method.
			* @returns {Object}
			*/
			'getReadOptions' : function () {
				return {
					'method' : 'getGroupByLicenseId',
					'args'   : {
						'licId' : this.get( 'LicenseId' )
					}
				};
			},

			/**
			* Define the method called on the server to create a group and the
			* arguments required for the supplied method.
			* @returns {Object}
			*/
			'getCreateOptions' : function () {
				return {
					'path'       : 'core.LicensesGateway',
					'objectPath' : 'core.Licenses',
					'method'     : 'save',
					'args'       : this.toJSON()
				};
			},

			'getUpdateOptions' : function () {
				return {
					'path'       : 'core.LicensesGateway',
					'objectPath' : 'core.Licenses',
					'method'     : 'save',
					'args'       : this.toJSON()
				};
			},

			/**
			* Join this group
			* @param {Integer} persId
			*	The ID of the user you want to join this group
			* @returns {Deferred}
			*/
			'join' : function ( persId ) {
				var data = {
					'path'   : 'AdminService',
					'method' : 'takeASeatFromLicense',
					'args'   : {
						'persId'    : parseInt( persId ),
						'licId'     : this.get( 'LicenseId' ),
						'creatorId' : Session.personnelId()
					}
				};

				return Remoting.fetch( data );
			},

			/**
			* Leave this group
			* @param {Integer} persId
			*	The ID of the user you want to leave this group
			* @returns {Deferred}
			*/
			'leave' : function ( persId ) {
				var data = {
					'path'   : 'AdminService',
					'method' : 'returnASeatToLicense',
					'args'   : {
						'persId'    : parseInt( persId ),
						'licId'     : this.get( 'LicenseId' ),
						'removerId' : Session.personnelId()
					}
				};

				return Remoting.fetch( data );
			},

			/**
			* Check if a user is a member of this group
			* @param {Integer} persId
			*	The ID of the user you want to verify
			* @returns {Deferred}
			*/
			'userIsGroupMember' : function ( persId ) {
				// Check to see if a person is in this group
				var data = {
					'path'   : 'GroupService',
					'method' : 'userIsGroupMember',
					'args'   : {
						'licId'  : this.get( 'LicenseId' ),
						'persId' : persId
					}
				};

				var fetch = Remoting.fetch( data );
				// Set a local variable once the request is done so we have
				// access at later times
				fetch.done( _.bind( function ( res ) {
					this.isMember = res[ 0 ];
				}, this ) );

				return fetch;

			},

			/**
			* Check if a user is the creator of this group
			* @param {Integer} persId
			*	The ID of the user you want to verify
			* @returns {Deferred}
			*/
			'userIsCreator' : function ( persId ) {
				if ( this.get( 'Creator' ) === parseInt( persId ) ) {
					return true;
				}
				return false;
			},

			/**
			* Check if a user is an admin of this group
			* @param {Integer} persId
			*	The ID of the user you want to verify
			* @returns {Deferred}
			*/
			'userIsAdmin' : function ( persId ) {

				persId = parseInt( persId );

				var data = {
					'path'   : 'GroupService',
					'method' : 'userIsGroupAdmin',
					'args'   : {
						'licId'  : this.get( 'LicenseId' ),
						'persId' : persId
					}
				};

				return Remoting.fetch( data );

			},

			/**
			* Get the members belonging to this group
			* @param {Integer} limit
			*	return only a certain number of members
			* @returns {Deferred}
			*	The Deferred will be resolved with a {App.Entities.GroupMemberCollection}
			*/
			'getMembers' : function ( limit ) {

				var def = App.Deferred();

				// if no limit is provided, default to all of them
				limit = limit || -1;

				var memberCollection = new App.Entities.GroupMemberCollection( [ ], {
					'limit'   : limit,
					'groupId' : this.get( 'LicenseId' )
				} );

				App.when( memberCollection.fetch() )
					.done( function () {
						def.resolve( memberCollection );
					} );

				return def.promise();

			},

			/**
			* Get the date of the last activity for this group
			* @returns {Deferred}
			*/
			'getLastUpdate' : function () {
				var data = {
					'path'   : 'GroupService',
					'method' : 'getMostRecentActivityDateForGroup',
					'args'   : {
						'licId' : this.get( 'LicenseId' )
					}
				};

				return Remoting.fetch( data );
			},

			/**
			* Get the resources available for this group
			* @param {String} fileType
			*	'leader' | 'member' as the available resources
			* @returns {Deferred}
			*	The Deferred will be resolved with a {App.Entities.GroupResourcesCollection}
			*/
			'getResources' : function ( fileType ) {

				var def = App.Deferred();

				var resourcesCollection = new App.Entities.GroupResourcesCollection( [ ], {
					'groupId'  : this.get( 'LicenseId' ),
					'fileType' : fileType
				} );

				App.when( resourcesCollection.fetch() )
					.done( function () {
						def.resolve( resourcesCollection );
					} );

				return def.promise();
			},

			/**
			* Get just the leader resources
			* @see {@link getResources}
			*/
			'getLeaderResources' : function () {
				return this.getResources( 'leader' );
			},

			/**
			* Get just the member resources
			* @see {@link getResources}
			*/
			'getMemberResources' : function () {
				return this.getResources( 'member' );
			},

			/**
			* Get the links available for this group
			* @param {String} linkType
			*	'leader' | 'member' as the available link types
			* @returns {Deferred}
			*	The Deferred will be resolved with a {App.Entities.GroupLinkCollection}
			*/
			'getLinks' : function ( linkType ) {
				var def = App.Deferred();

				var linkCollection = new App.Entities.GroupLinkCollection( [ ], {
					'groupId'  : this.get( 'LicenseId' ),
					'linkType' : linkType
				} );

				App.when( linkCollection.fetch() )
					.done( function () {
						def.resolve( linkCollection );
					} );

				return def.promise();
			},

			/**
			* Get just the leader links
			* @see {@link getLinks}
			*/
			'getLeaderLinks' : function () {
				return this.getLinks( 'leader' );
			},

			/**
			* Get just the member links
			* @see {@link getLinks}
			*/
			'getMemberLinks' : function () {
				return this.getLinks( 'member' );
			},

			/**
			* Update the search index for this group. This also takes care
			* of index resources.
			* @returns {Deferred}
			*/
			'updateSearchIndex' : function () {
				var data = {
					'path'   : 'SearchService',
					'method' : 'updateGroupsSearchIndex',
					'args'   : {
						'groupId' : this.get( 'LicenseId' )
					}
				};

				return Remoting.fetch( data );
			},

			'createLinkResource' : function ( options ) {
				var url = 'com/schoolimprovement/pd360/dao/groups/GroupResourceUpload.cfc';
				return $.ajax( url, {
					'type' : 'POST',
					'data' : {
						'Method'      : 'UploadLink',
						'groupId'     : this.get( 'LicenseId' ),
						'personnelId' : Session.personnelId(),
						'linkURL'     : options.linkURL,
						'description' : options.description
					}
				} );
			}

		} );

	} );

} );
