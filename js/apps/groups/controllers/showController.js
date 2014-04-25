define( function ( require ) {
	'use strict';

	var Remoting            = require( 'Remoting' );
	var Session             = require( 'Session' );
	var MemberCollection    = require( '../collections/MemberCollection' );
	var CommentCollection   = require( '../collections/CommentCollection' );
	var ResourcesCollection = require( '../collections/ResourcesCollection' );
	var GroupModel          = require( '../models/GroupModel' );
	var App                 = require( 'App' );
	var $                   = require( 'jquery' );
	var _                   = require( 'underscore' );
	var Vent                = require( 'Vent' );

	App.module( 'Groups.Show', function ( Show ) {

		Show.Controller = {

			'showGroup' : function ( groupId ) {

				// TODO: use sync instead of remoting

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
						'numRows'   : 10000,
						'totalRows' : 10000,
						'msgFlag'   : 1,
						'newsFlag'  : 1
					}
				};

				// Get resources of the group
				// TODO : replace with correct API
				var resourcesRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.groups.GroupMessagesGateway',
					'method' : 'getGroupWall',
					'args'   : {
						'licId'     : groupId,
						'startRow'  : 0,
						'numRows'   : 10000,
						'totalRows' : 10000,
						'msgFlag'   : 1,
						'newsFlag'  : 1
					}
				};

				// Check if user is an admin
				var groupAdminRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
					'method' : 'userIsGroupAdmin',
					'args'   : {
						'licId'     : groupId,
						'persId' : $.cookie( 'PID' ) || null
					}
				};

				var requests     = [ groupRequest, membersRequest, groupsRequest, wallRequest, resourcesRequest, groupAdminRequest ];
				var fetchingData = Remoting.fetch( requests );

				$.when( fetchingData ).done( function ( results ) {

					this.layout = new App.Groups.Views.Layout();
					App.content.show( this.layout );

					var group          = results [ 0 ];
					var someMembers    = results [ 1 ].slice( 0, 8 );
					var membersCount   = results [ 1 ].length;
					var members        = results [ 1 ];
					var groups         = results [ 2 ];
					var groupWall      = results [ 3 ];
					var resources      = results [ 4 ];
					var userGroupAdmin = results [ 5 ];

					var getCommentGroup = function ( wall ) {
						return _.groupBy( wall, 'MessageThreadId' );
					};

					var getFirstComment = function ( commentGroup ) {
						return _.find( commentGroup, { 'MessageId': 1 } );
					};

					// get the replies
					var mapReplies = function ( commentGroup ) {
						return _.map(
							// return when MessageId is not 1
							_.reject( commentGroup, { 'MessageId' : 1 } ), function( elem ) {
							return _.pick( elem,
								'MessageThreadId',
								'MessageId',
								'Message',
								'LicenseId',
								'Creator',
								'Created',
								'Remover',
								'Removed',
								'CreatorFullName',
								'CreatorAvatar',
								'Created',
								'NewsEntry',
								'NewsId'
							);
				        } );
					};

					// get message first message in thread
					var getMainComment = function ( commentGroup ) {
						 return _.pick( getFirstComment( commentGroup ),
						    'MessageThreadId',
						    'MessageId',
						    'Message',
						    'LicenseId',
						    'Creator',
						    'Created',
						    'Remover',
						    'Removed',
						    'CreatorFullName',
						    'CreatorAvatar',
						    'Created',
						    'NewsEntry',
						    'NewsId'
					    );
					};

					// set the comments
					var getComments = function ( commentGroup ) {
						return _.extend( getMainComment( commentGroup ), { replies: mapReplies( commentGroup ) } );
					};

					// Set the comments
					// the wall returned is a single list of comments
					// using 'MessageThreadId' this will create an array of objects
					// each object will contain the main message and an array of 'replies'
					var comments = _.map( getCommentGroup( groupWall ),
						function( commentGroup ) {
						    return getComments( commentGroup );
						}
					);

					// Creating a comment needs to display the user avatar
					// find the user in the members list
					var userInGroup = _.find( members, function ( m ) {
						return String( m.PersonnelId ) === String( Session.personnelId() );
					} );

					var commentCollection    = new CommentCollection( comments );
					var resourcesCollection  = new ResourcesCollection( resources );
					var groupModel           = new GroupModel( group );
					var someMemberCollection = new MemberCollection( someMembers );
					var memberCollection     = new MemberCollection( members );
					memberCollection.count   = membersCount;
					groupModel.groups        = groups;


					Vent.on( 'group:removeComment', function ( model ) {
						commentCollection.remove( model );
					}.bind( this ) );

					// banner image and join button
					var bannerView = new App.Groups.Views.Banner( { 'model' : groupModel, 'groups' : groups, 'userGroupAdmin' : userGroupAdmin } );
					this.layout.bannerRegion.show( bannerView );

					// group name
					var headerView = new App.Groups.Views.Header( { 'model' : groupModel, 'collection' : someMemberCollection } );
					this.layout.headerRegion.show( headerView );

					// members list and group info
					var infoView = new App.Groups.Views.Info( { 'model' : groupModel, 'collection' : someMemberCollection } );
					this.layout.groupInfoRegion.show( infoView );

					// group sub navigation ( tabs )
					var subNavView = new App.Groups.Views.SubNav( { 'model' : groupModel, 'groups' : groups } );
					this.layout.subNavRegion.show( subNavView );

					// Show group member items
					if ( userInGroup ) {

						// Wall
						var commentsView = new App.Groups.Views.CommentsCollection( { 'collection' : commentCollection, 'user' : userInGroup } );
						this.layout.commentsRegion.show( commentsView );

						// Comment create textarea
						var commentCreateView = new App.Groups.Views.CommentCreate( { 'model' : groupModel, 'user' : userInGroup } );
						this.layout.commentCreateRegion.show( commentCreateView );

						// update the wall after creating a message
						Vent.on( 'group:createComment', function () {

							// the wall needs to be requested because creating doesn't return the MessageThreadId
							var requests     = [ wallRequest ];
							var fetchingData = Remoting.fetch( requests );
							$.when( fetchingData ).done( function ( results ) {

								var newWall = results[ 0 ];

								var comments = _.map( _.groupBy( newWall, 'MessageThreadId' ), function( comment ) {
								    return _.extend( _.pick( _.find( comment, { 'MessageId': 1 } ) , 'MessageThreadId', 'MessageId', 'Message', 'LicenseId', 'Creator', 'Created', 'Remover', 'Removed', 'CreatorFullName', 'CreatorAvatar', 'Created', 'NewsEntry', 'NewsId' ), {
								        replies : _.map( _.reject( comment, { 'MessageId' : 1 } ), function( elem ) {
											return _.pick( elem, 'MessageThreadId', 'MessageId', 'Message', 'LicenseId', 'Creator', 'Created', 'Remover', 'Removed', 'CreatorFullName', 'CreatorAvatar', 'Created', 'NewsEntry', 'NewsId' );
								        } )
								    } );
								} );

								commentCollection = new CommentCollection( comments );

								var commentsView = new App.Groups.Views.CommentsCollection( { 'collection' : commentCollection, 'user' : userInGroup } );
								this.layout.commentsRegion.show( commentsView );

							}.bind( this ) );

						}.bind( this ) );

					}

					// Members tabs
					var membersView = new App.Groups.Views.Members( { 'model' : groupModel, 'collection' : memberCollection } );
					this.layout.membersRegion.show( membersView );

					var resourcesView = new App.Groups.Views.Resources( { 'collection' : resourcesCollection } );
					this.layout.resourcesRegion.show( resourcesView );


				}.bind( this ) ).fail( function () {
					// TODO: error handling
				} );

			}

		};

	} );

} );
