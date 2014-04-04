define( function ( require ) {
	'use strict';

	var Remoting          = require( 'Remoting' );
	var Session           = require( 'Session' );
	var MemberCollection  = require( '../collections/MemberCollection' );
	var CommentCollection = require( '../collections/CommentCollection' );
	var GroupModel        = require( '../models/GroupModel' );
	var App               = require( 'App' );
	var $                 = require( 'jquery' );
	var _                 = require( 'underscore' );
	var Vent              = require( 'Vent' );

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

				// Get groups to determine if already a member
				var wallRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.groups.GroupMessagesGateway',
					'method' : 'getGroupWall',
					'args'   : {
						'licId'     : groupId,
						'startRow'  : 0,
						'numRows'   : 20,
						'totalRows' : 80,
						'msgFlag'   : 1,
						'newsFlag'  : 1
					}
				};

				var requests     = [ groupRequest, membersRequest, groupsRequest, wallRequest ];
				var fetchingData = Remoting.fetch( requests );

				$.when( fetchingData ).done( function ( results ) {

					var layout = new App.Groups.Views.Layout();
					App.content.show( layout );

					var group        = results [ 0 ];
					var someMembers  = results [ 1 ].slice( 0, 8 );
					var membersCount = results [ 1 ].length;
					var members      = results [ 1 ];
					var groups       = results [ 2 ];
					var groupWall    = results [ 3 ];

					// Set the comments
					// the wall returned is a single list of comments
					// using 'MessageThreadId' this will create an array of objects
					// each object will contain the main message and an array of 'replies'
					var comments = _.map( _.groupBy( groupWall, 'MessageThreadId' ), function( comment ) {
					    return _.extend( _.pick( _.find( comment, { 'MessageId': 1 }) , 'MessageThreadId', 'MessageId', 'Message', 'LicenseId', 'Creator', 'Created', 'Remover', 'Removed', 'CreatorFullName', 'CreatorAvatar', 'Created' ), {
					        replies: _.map( _.reject( comment, { 'MessageId' : 1 } ), function( elem ) {
								return _.pick( elem, 'MessageThreadId', 'MessageId', 'Message', 'LicenseId', 'Creator', 'Created', 'Remover', 'Removed', 'CreatorFullName', 'CreatorAvatar', 'Created' );
					        } )
					    } );
					} );

					// Creating a comment needs to display the user avatar
					// find the user in the members list
					var user = _.find( members, function ( m ) {
						return String( m.PersonnelId ) === String( Session.personnelId() );
					} );

					var commentCollection    = new CommentCollection( comments );
					var groupModel           = new GroupModel( group );
					var someMemberCollection = new MemberCollection( someMembers );
					var memberCollection     = new MemberCollection( members );
					memberCollection.count   = membersCount;
					groupModel.groups        = groups;

					// update the wall after creating a message
					Vent.on( 'group:createComment', function ( model ) {
						commentCollection.add( model );
					}.bind( this ) );

					Vent.on( 'group:removeComment', function ( model ) {
						commentCollection.remove( model );
					}.bind( this ) );

					// banner image and join button
					var bannerView = new App.Groups.Views.Banner( { 'model' : groupModel, 'groups' : groups } );
					layout.bannerRegion.show( bannerView );

					// group name
					var headerView = new App.Groups.Views.Header( { 'model' : groupModel, 'collection' : someMemberCollection } );
					layout.headerRegion.show( headerView );

					// members list and group info
					var infoView = new App.Groups.Views.Info( { 'model' : groupModel, 'collection' : someMemberCollection } );
					layout.groupInfoRegion.show( infoView );

					// banner image and join button
					var commentCreateView = new App.Groups.Views.CommentCreate( { 'model' : groupModel, 'user' : user } );
					layout.commentCreateRegion.show( commentCreateView );

					// wall
					var commentsView = new App.Groups.Views.CommentsCollection( { 'collection' : commentCollection } );
					layout.commentsRegion.show( commentsView );

					// Members tabs
					var membersView = new App.Groups.Views.Members( { 'model' : groupModel, 'collection' : memberCollection } );
					layout.membersRegion.show( membersView );


				} ).fail( function ( error ) {
					// TODO: error handling
				} );

			}

		};

	} );

} );
