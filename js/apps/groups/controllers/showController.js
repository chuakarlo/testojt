define( function ( require ) {
	'use strict';

	var Remoting         = require( 'Remoting' );
	var MemberCollection = require( '../collections/MemberCollection' );
	var GroupModel       = require( '../models/GroupModel' );
	var App              = require( 'App' );
	var $                = require( 'jquery' );

	App.module( 'Groups.Show', function ( Show ) {

		Show.Controller = {

			'showGroup' : function ( groupId ) {

				// Get general group info
				var groupRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
					'method' : 'getGroupByLicenseId',
					'args'   : {
						'licId' : groupId
					}
				};

				// Get member group info
				var membersRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
					'method' : 'getUsersInGroup',
					'args'   : {
						'licId'   : groupId,
						'maxRows' : 8
					}
				};

				// Get all members to get a count
				var membersCountRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
					'method' : 'getUsersInGroup',
					'args'   : {
						'licId'   : groupId,
						'maxRows' : -1
					}
				};

				// Get groups to determine if already a member
				var groupsRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
					'method' : 'getValidGroupsByPersonnelIdOrderedByRecentActivity',
					'args'   : {
						'persId' : $.cookie( 'PID' ) || null
					}
				};

				var requests     = [ groupRequest, membersRequest, membersCountRequest, groupsRequest ];
				var fetchingData = Remoting.fetch( requests );

				$.when( fetchingData ).done( function ( results ) {

					var layout = new App.Groups.Views.Layout();
					App.content.show( layout );

					var group        = results [ 0 ];
					var members      = results [ 1 ];
					var membersCount = results [ 2 ].length;
					var groups       = results [ 3 ];

					var groupModel         = new GroupModel( group );
					var memberCollection   = new MemberCollection( members );
					memberCollection.count = membersCount;
					groupModel.groups      = groups;

					// banner image and join button
					var bannerView = new App.Groups.Views.Banner( { 'model' : groupModel, 'groups' : groups } );
					layout.bannerRegion.show( bannerView );

					// members list and group name
					var headerView = new App.Groups.Views.Header( { 'model' : groupModel, 'collection' : memberCollection } );
					layout.headerRegion.show( headerView );

					// wall
					var commentsView = new App.Groups.Views.Comments( { 'model' : groupModel } );
					layout.commentsRegion.show( commentsView );

				} ).fail( function ( error ) {
					// TODO: error handling
				} );

			}
		};

	} );

} );
