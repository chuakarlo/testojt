define( function ( require ) {
	/**
	* @file
	* A Backbone Model that represents a Group.
	*/
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );
	App.module( 'Entities', function ( Mod ) {

		Mod.GroupMembershipRequestModel = Backbone.CFModel.extend( /** @lends App.Entities.GroupModel# */ {

			'path' : 'groups.GroupMembershipRequestsGateway',

			'defaults' : {
				'LicenseId'   : 0,
				'PersonnelId' : 0,
				'RequestId'   : 0,
				'Created'     : '',
				'Admitted'    : '',
				'Admittor'    : 0,
				'Ignored'     : '',
				'Ignorer'     : 0,
				'Blocked'     : '',
				'Blocker'     : 0
			},

			'getCreateOptions' : function () {
				return {
					'objectPath' : 'groups.GroupMembershipRequests',
					'method'     : 'create',
					'args'       : this.toJSON()
				};
			}
		} );

	} );
} );
