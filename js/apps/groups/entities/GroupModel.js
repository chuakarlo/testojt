define( function ( require ) {
	/**
	* @file
	* A Backbone Model that represents a Group.
	*/
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var Remoting = require( 'Remoting' );
	var App      = require( 'App' );

	require( 'groups/entities/GroupMemberCollection' );
	require( 'groups/entities/GroupResourcesCollection' );
	require( 'groups/entities/GroupLinksCollection' );

	App.module( 'Entities', function ( Mod ) {

		Mod.GroupModel = Backbone.CFModel.extend(/** @lends App.Entities.GroupModel# */ {
			/**
			* The location of the server endpoint
			* @member {String} path
			*/
			'path' : 'GroupService',

			/**
			* A property to track the value of the last call to {userIsGroupMember}
			* @member {Boolean} isMember
			*/
			'isMember' : false,

			/**
			* Determine the method called on the server and the arguments
			* required for the supplied method.
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
			* Check if a user is a member of this group
			* @param {Integer} persId
			*	The ID of the user you want to verify
			* @returns {Deferred}
			*/
			'userIsGroupMember' : _.memoize( function ( persId ) {
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

			} ),

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
			'userIsAdmin' : _.memoize( function ( persId ) {
				// Check to see if a person is a group admin
				var data = {
					'path'   : 'GroupService',
					'method' : 'userIsGroupAdmin',
					'args'   : {
						'licId'  : this.get( 'LicenseId' ),
						'persId' : persId
					}
				};

				return Remoting.fetch( data );

			} ),

			/**
			* Get the members belonging to this group
			* @param {Integer} limit
			*	return only a certain number of members
			* @returns {Deferred}
			*	The Deferred will be resolved with a {App.Entities.GroupMemberCollection}
			*/
			'getMembers' : function ( limit ) {

				var def = App.Deferred();

				limit = limit || -1;

				var memberCollection = new App.Entities.GroupMemberCollection([ ], {
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
			'getLastUpdate' : _.memoize( function () {
				var data = {
					'path'   : 'GroupService',
					'method' : 'getMostRecentActivityDateForGroup',
					'args'   : {
						'licId' : this.get( 'LicenseId' )
					}
				};

				return Remoting.fetch( data );
			} ),

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
			}

		} );

	} );

} );
