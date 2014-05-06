define( function ( require ) {
	'use strict';

	var $                     = require( 'jquery' );
	var Remoting              = require( 'Remoting' );
	var App                   = require( 'App' );
	var GroupCollection       = require( 'groups/collections/GroupCollection' );
	var GroupInviteCollection = require( 'groups/collections/GroupInviteCollection' );

	App.module( 'Groups.List', function ( List ) {

		List.Controller = {

			'listGroups' : function () {
				// get general groups info
				var groupsRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
					'method' : 'getValidGroupsByPersonnelIdOrderedByRecentActivity',
					'args'   : {
						'persId' : $.cookie( 'PID' ) || null
					}
				};

				var groupInvitesRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
					'method' : 'getGroupMembershipInvites',
					'args'   : {
						'emailAddress' : 'tyler.hansen@schoolimprovement.com'
					}
				};

				var requests     = [ groupsRequest, groupInvitesRequest ];
				var fetchingData = Remoting.fetch( requests );

				App.when( fetchingData ).done( function ( results ) {

					var groups = new GroupCollection( results[ 0 ] );
					var groupInvites = new GroupInviteCollection( results[ 1 ] );

					this.layout = new App.Groups.Views.GroupListLayout();
					App.content.show( this.layout );

					var groupsView = new App.Groups.Views.List( { 'collection' : groups } );
					this.layout.groupsRegion.show( groupsView );

					var groupInvitesView = new App.Groups.Views.InvitesList( { 'collection' : groupInvites } );
					this.layout.groupInvitesRegion.show( groupInvitesView );

				}.bind( this ) ).fail( function ( error ) {
					// TODO: error handling
				} );

			}

		};

	} );

} );
