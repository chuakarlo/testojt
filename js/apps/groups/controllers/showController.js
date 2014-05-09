define( function ( require ) {
	'use strict';

	var App                 = require( 'App' );
	var $                   = require( 'jquery' );
	var _                   = require( 'underscore' );
	var Marionette          = require( 'marionette' );
	var Vent                = require( 'Vent' );

	var Remoting            = require( 'Remoting' );
	var Session             = require( 'Session' );
	var MemberCollection    = require( '../collections/MemberCollection' );
	var ResourcesCollection = require( '../collections/ResourcesCollection' );
	var GroupModel          = require( '../models/GroupModel' );

	require( 'groups/entities/WallCommentCollection');
	require( 'groups/entities/WallCommentModel');

	App.module( 'Groups.Show', function ( Mod ) {

		var ShowController = Marionette.Controller.extend( {

			'initialize' : function () {
				this.listenTo( App.vent, 'groups:newCommentFetch', this.newCommentFetch );
			},

			'newCommentFetch' : function ( options ) {
				// This is a fun function that handles when a new comment was
				// added. Allows you to specify a specific location to query
				// against the server to get just a specific comment ( parent
				// comments only ). Also allows a success and error cb function
				// to be passed and called. We've known each other for so long
				// Your heart's been aching, but you're too shy to say it
				// Inside, we both know what's been going on
				// We know the game and we're gonna play it

				// The last starting point for the query
				var oldStart = this.wallCollection.wallQueryModel.get( 'startRow' );
				var oldNum = this.wallCollection.wallQueryModel.get( 'numRows' );

				this.wallCollection.wallQueryModel.set( {
					'startRow' : options.startRow,
					'numRows'  : options.numRows
				} );

				this.wallCollection.fetch( {
					'reset'   : false,
					'remove'  : false,
					'success' : _.bind( function () {
						// Once we've fetched just that post and it's
						// children, set the queryModel back to what it was
						this.wallCollection.wallQueryModel.set( {
							'startRow' : oldStart,
							'numRows'  : oldNum
						} );

						if ( options.successCb ) {
							options.successCb();
						}

					}, this ),

					'error' : function () {
						if ( options.errorCb ) {
							options.errorCb();
						}
					}
				} );
			},

			'fetchWall' : function ( groupId ) {

				// This keeps track of our query for infinite scrolling
				this.wallQueryModel = new App.Entities.WallQueryModel( {
					'licId' : groupId
				} );

				// This will hold all of our wall posts.
				this.wallCollection = new App.Entities.WallCommentCollection( {
					'queryModel' : this.wallQueryModel
				});

				this.wallCollection.fetch( {
					'success' : _.bind( function ( collection ) {
						this.wallCollection.updateStartRow();
						this.buildWall();
					}, this ),

					'error' : function () {
						this.layout.commentsRegion.show( new App.Common.ErrorView( {
							'message' : 'There was an error loading the wall.',
							'flash'   : 'An error occurred. Please try again later.'
						} ) );
					}
				} );

			},

			'buildWall' : function ( collection ) {
				// Wall
				var commentsView = new App.Groups.Views.CommentsCollection( {
					'collection' : this.wallCollection,
					'user'       : this.userInGroup
				} );

				this.layout.commentsRegion.show( commentsView );
				this.setupInfiniteScroll();

			},

			'setupInfiniteScroll' : function () {
				// When the window scroll bar gets to 200px from the bottom
				// of the window, fetch the next set of results.

				// check to see if we should continue setting up the smack
				if ( !this.wallCollection.maxResults ) {

				// if ( totalRows > start && totalRows > rows || !totalRows && !start ) {
					$( window ).smack( {
						'threshold' : '200px'
					} )
						.done( _.bind(function () {
							// Show Loading
							this.showLoading();
							// Reset starting point
							this.wallCollection.fetch( {
								'reset'   : false,
								'remove'  : false,
								'success' : _.bind( function () {
									this.wallCollection.updateStartRow();
									this.setupInfiniteScroll();
									this.closeLoading();
								}, this ),
								'error'   : _.bind( function () {
									var msg = 'An error occurred loading more' +
									'comments. Please try again later.';
									App.vent.trigger( 'flash:message', {
										'message' : msg
									} );
									this.closeLoading();
								}, this )
							});
						}, this) );
				}

			},

			'showLoading' : function () {
				var loading = new App.Common.LoadingView( {
					'size'       : 'small',
					'background' : true,
					'text'       : 'Loading Posts'
				} );
				this.layout.loadingRegion.show(loading);
			},

			'closeLoading' : function () {
				this.layout.loadingRegion.close();
			},

			'showGroup' : function ( groupId ) {

				// show a loading view while data is fetching
				App.content.show( new App.Common.LoadingView() );

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

				// Get resources of the group
				// fileTypeId : 9 - for leader uploaded, 11 for group user
				var leaderResourcesRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.CommunityService',
					'method' : 'getFileUploadsByTypeAndLocationAndFileType',
					'args'   : {
						'locationTypeId' : 5,
						'locationId'     : groupId,
						'fileTypeId'     : 9,
						'startRow'       : 0,
						'maxRows'        : 500
					}
				};

				var userResourcesRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.CommunityService',
					'method' : 'getFileUploadsByTypeAndLocationAndFileType',
					'args'   : {
						'locationTypeId' : 5,
						'locationId'     : groupId,
						'fileTypeId'     : 11,
						'startRow'       : 0,
						'maxRows'        : 500
					}
				};

				// linkTypeId : 6 - for leader uploaded, 7 for group user
				var leaderLinksRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.CommunityService',
					'method' : 'getLinkUploadsByTypeAndLocationAndLinkType',
					'args'   : {
						'locationTypeId' : 5,
						'locationId'     : groupId,
						'linkTypeId'     : 6,
						'startRow'       : 0,
						'maxRows'        : 500
					}
				};

				var userLinksRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.CommunityService',
					'method' : 'getLinkUploadsByTypeAndLocationAndLinkType',
					'args'   : {
						'locationTypeId' : 5,
						'locationId'     : groupId,
						'linkTypeId'     : 7,
						'startRow'       : 0,
						'maxRows'        : 500
					}
				};

				// Check if user is an admin
				var groupAdminRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
					'method' : 'userIsGroupAdmin',
					'args'   : {
						'licId'  : groupId,
						'persId' : $.cookie( 'PID' ) || null
					}
				};

				// Get the last updated date
				var groupLastUpdateRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.GroupService',
					'method' : 'getMostRecentActivityDateForGroup',
					'args'   : {
						'licId' : groupId
					}
				};

				var requests     = [ groupRequest, membersRequest, groupsRequest, leaderResourcesRequest, userResourcesRequest, leaderLinksRequest, userLinksRequest, groupAdminRequest, groupLastUpdateRequest ];

				var fetchingData = Remoting.fetch( requests );

				App.when( fetchingData ).done( function ( results ) {

					this.layout = new App.Groups.Views.Layout();
					App.content.show( this.layout );

					this.fetchWall( groupId );

					var group            = results [ 0 ];
					var someMembers      = results [ 1 ].slice( 0, 8 );
					var membersCount     = results [ 1 ].length;
					var members          = results [ 1 ];
					var groups           = results [ 2 ];
					var leaderResources  = results [ 3 ];
					var memberResources  = results [ 4 ];
					var leaderLinks      = results [ 5 ];
					var memberLinks      = results [ 6 ];
					var userGroupAdmin   = results [ 7 ];
					var groupLastUpdated = results [ 8 ];

					// Creating a comment needs to display the user avatar
					// find the user in the members list
					this.userInGroup = _.find( members, function ( m ) {
						return String( m.PersonnelId ) === String( Session.personnelId() );
					} );

					// var commentCollection          = new CommentCollection( comments );
					var leaderResourcesCollection  = new ResourcesCollection( leaderResources );
					var membersResourcesCollection = new ResourcesCollection( memberResources );
					var groupModel                 = new GroupModel( group );
					var someMemberCollection       = new MemberCollection( someMembers );
					var memberCollection           = new MemberCollection( members );

					memberCollection.count            = membersCount;
					groupModel.attributes.groups      = groups;
					groupModel.attributes.lastUpdated = groupLastUpdated;

					// add links to Collections
					leaderResourcesCollection.add( leaderLinks );
					membersResourcesCollection.add( memberLinks );

					Vent.on( 'group:removeComment', function ( model ) {
						// commentCollection.remove( model );
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
					if ( this.userInGroup ) {

						// Comment create textarea
						var commentCreateView = new App.Groups.Views.CommentCreate( {
							'model' : groupModel,
							'user'  : this.userInGroup
						} );

						this.layout.commentCreateRegion.show( commentCreateView );

						// update the wall after creating a message
						Vent.on( 'group:createComment', function () {

							// the wall needs to be requested because creating doesn't return the MessageThreadId
							// var requests     = [ wallRequest ];
							var fetchingData = Remoting.fetch( requests );
							App.when( fetchingData ).done( function ( results ) {

								// var newWall  = results[ 0 ];
								// var comments = getComments( newWall );

								// commentCollection = new CommentCollection( comments );

								// var commentsView = new App.Groups.Views.CommentsCollection( { 'collection' : commentCollection, 'user' : this.userInGroup } );
								// this.layout.commentsRegion.show( commentsView );

							}.bind( this ) );

						}.bind( this ) );

					}

					// Members tabs
					var membersView = new App.Groups.Views.Members( { 'model' : groupModel, 'collection' : memberCollection } );
					this.layout.membersRegion.show( membersView );

					var resourcesView = new App.Groups.Views.Resources( { 'collection' : leaderResourcesCollection } );
					this.layout.resourcesRegion.show( resourcesView );

					var resourcesMembersView = new App.Groups.Views.ResourcesMembers( { 'collection' : membersResourcesCollection } );
					this.layout.resourcesMembersRegion.show( resourcesMembersView );

				}.bind( this ) ).fail( function () {
					// TODO: error handling
				} );

			}

		} );

		Mod.Controller = new ShowController();

	} );

} );
