define( function ( require ) {
	'use strict';

	var Remoting          = require( 'Remoting' );
	var MemberCollection  = require( '../collections/MemberCollection' );
	var GroupModel        = require( '../models/GroupModel' );
	var GroupBannerView   = require( '../views/GroupBannerView' );
	var GroupHeaderView   = require( '../views/GroupHeaderView' );
	var GroupCommentsView = require( '../views/GroupCommentsView' );
	var GroupLayoutView   = require( '../views/GroupLayoutView' );
	var $                 = require( 'jquery' );

	return function ( Show, App ) {

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
						'persId' : $.cookie( 'PID' )
					}
				};

				var requests     = [ groupRequest, membersRequest, membersCountRequest, groupsRequest ];
				var fetchingData = Remoting.fetch( requests );

				$.when( fetchingData ).done( function ( results ) {

					this.layout = new GroupLayoutView();
					App.content.show( this.layout );

					var group        = results [ 0 ];
					var members      = results [ 1 ];
					var membersCount = results [ 2 ].length;
					var groups       = results [ 3 ];

					var groupModel         = new GroupModel( group );
					var memberCollection   = new MemberCollection( members );
					memberCollection.count = membersCount;
					groupModel.groups      = groups;

					// banner image and join button
					var bannerView = new GroupBannerView( { 'model' : groupModel, 'groups' : groups } );
					this.layout.bannerRegion.show( bannerView );

					// members list and group name
					var headerView = new GroupHeaderView( { 'model' : groupModel, 'collection' : memberCollection } );
					this.layout.headerRegion.show( headerView );

					// wall
					var commentsView = new GroupCommentsView( { 'model' : groupModel } );
					this.layout.commentsRegion.show( commentsView );

				} ).fail( function ( error ) {
					// TODO: error handling
				} );

			}
		};

	};

} );
