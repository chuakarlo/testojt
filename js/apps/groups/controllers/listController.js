define( function ( require ) {
	'use strict';

	var $                     = require( 'jquery' );
	var Remoting              = require( 'Remoting' );
	var App                   = require( 'App' );
	var GroupCollection       = require( 'groups/collections/GroupCollection' );
	var GroupInviteCollection = require( 'groups/collections/GroupInviteCollection' );
	var Vent                  = require( 'Vent' );
	var _                     = require( 'underscore' );

	App.module( 'Groups.List', function ( List ) {

		List.Controller = {

			'listGroups' : function () {

				// show a loading view while data is fetching
				App.content.show( new App.Common.LoadingView() );

				// get email address of user
				var userProfileRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelGateway',
					'method' : 'getById',
					'args'   : {
						'id' : $.cookie( 'PID' ) || null
					}
				};

				// get general groups info
				var groupsRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
					'method' : 'getValidGroupsByPersonnelIdOrderedByRecentActivity',
					'args'   : {
						'persId' : $.cookie( 'PID' ) || null
					}
				};
				// get group invites info
				var groupInvitesRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
					'method' : 'getGroupMembershipInvites',
					'args'   : {
						'emailAddress' : ''
					}
				};

				var requests     = [ groupsRequest, userProfileRequest ];
				var fetchingData = Remoting.fetch( requests );

				App.when( fetchingData ).done( function ( results ) {
					var groups = new GroupCollection( results[ 0 ] );
					var userProfile = results[ 1 ];

					this.layout = new App.Groups.Views.GroupListLayout();
					App.content.show( this.layout );

					var groupsView = new App.Groups.Views.List( { 'collection' : groups } );
					this.layout.groupsRegion.show( groupsView );

					groupInvitesRequest.args.emailAddress = _.values(_.pick(userProfile, 'EmailAddress'))[ 0 ];
					var fetchingData = Remoting.fetch( groupInvitesRequest );

					App.when( fetchingData ).done( function ( result ) {
						var groupInvites = new GroupInviteCollection( result[ 0 ] );
						groupInvites.each( function ( data ) {
							data.set( { 'InviteeEmail' : userProfile.EmailAddress } );
						} );

						Vent.on( 'group:removeGroupInvites', function ( model ) {
							groupInvites.remove( model );
						}.bind( this ) );

						var groupInvitesView = new App.Groups.Views.InvitesList( { 'collection' : groupInvites } );
						this.layout.groupInvitesRegion.show( groupInvitesView );
					}.bind( this ) ).fail( function ( error ) {
						// TODO: error handling
					} );
				}.bind( this ) ).fail( function ( error ) {
					// TODO: error handling
				} );

			}

		};

	} );

} );
