define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App = require( 'App' );

	require( 'groups/entities/GroupMemberModel' );

	App.module( 'Entities', function ( Mod ) {

		var groupIdError = function () {
			throw new Error( 'The groupId option is required' );
		};

		Mod.GroupMemberCollection = Backbone.CFCollection.extend( {

			'model' : App.Entities.GroupMemberModel,

			'path'   : 'GroupService',

			'initialize' : function ( models, options ) {
				options = options || { };
				// Limit the number of members to return

				if ( !options.groupId ) {
					groupIdError();
				}
				this.groupId = options.groupId;

				this.limit = options.limit || -1;
			},

			'getReadOptions' : function () {
				return {
					'method' : 'getUsersInGroup',
					'args'   : {
						'licId'   : this.groupId,
						'maxRows' : this.limit
					}
				};
			}
		} );
	} );

} );
