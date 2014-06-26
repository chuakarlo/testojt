define( function ( require ) {
	'use strict';

	return function () {

		var _          = require( 'underscore' );
		var Vent       = require( 'Vent' );
		var App        = require( 'App' );
		var Session    = require( 'Session' );

		require( 'common/controllers/BaseController' );
		require( 'groups/controllers/listController' );
		require( 'groups/controllers/createController' );
		require( 'groups/controllers/editController' );
		require( 'groups/controllers/wallController' );
		require( 'groups/controllers/leaderController' );
		require( 'groups/controllers/headerController' );
		require( 'groups/controllers/sideController' );
		require( 'groups/controllers/resourcesController' );
		require( 'groups/controllers/membersController' );
		require( 'groups/controllers/forumController' );
		require( 'groups/controllers/uploadResourceController' );
		require( 'groups/views/Views' );
		require( 'groups/entities/GroupCollection' );
		require( 'groups/entities/GroupInviteCollection' );

		// ## Groups App
		App.module( 'Groups', function ( Groups ) {

			var AuthRouter = require( 'AuthRouter' );
			// load group

			// configure groups routes
			Groups.Router = AuthRouter.extend( {

				'appRoutes' : {
					'groups'                    : 'listGroups',
					'groups/create'             : 'showCreateGroup',
					'groups/:groupId'           : 'showGroupWall',
					'groups/:groupId/wall'      : 'showGroupWall',
					'groups/:groupId/forums'    : 'showGroupForums',
					'groups/:groupId/resources' : 'showGroupResources',
					'groups/:groupId/members'   : 'showGroupMembers',
					'groups/:groupId/info'      : 'showGroupInfo',
					'groups/:groupId/leader'    : 'showGroupLeaderTools',
					'groups/:groupId/upload'    : 'uploadResource'
				}

			} );

			var APIController = App.Common.Controllers.BaseController.extend( {

				'region' : App.content,

				'getData' : function ( groupId ) {

					// Check to see if this is the group we already have loaded
					if ( !this.model || this.model.get( 'LicenseId') !== groupId ) {

						this.model = new App.Entities.GroupModel( {
							'LicenseId' : groupId
						} );

						return App.when(
							this.model.fetch(),
							this.model.userIsGroupMember( Session.personnelId() )
						).promise();
					} else {
						return App.Deferred().resolve( this.model );
					}

				},

				'setup' : function ( groupId, showInfo ) {

					if ( !_.isBoolean( showInfo ) ) {
						showInfo = true;
					}
					// Close the flash
					App.request( 'pd360:hide' );

					var def = App.Deferred();

					if ( !this.layout ) {
						// Show loading
						App.content.show( new App.Common.LoadingView() );
					}

					App.when( this.getData( groupId ) ).done( _.bind( function () {

						if ( !this.layout ) {
							this.layout = new App.Groups.Views.Layout();

							this.listenTo( this.layout, 'close', this.onLayoutClose );
							App.content.show( this.layout );
						}

						// Show the header and side views
						this.showHeader( groupId );

						// Do we want to show the side crap?
						if ( showInfo ) {
							// We want the info on the side not the tabbed view
							this.showGroupInfo( groupId, 'side' );
						} else {
							// shut er down
							this.layout.groupInfoRegion.close();
						}

						def.resolve();
					}, this ) );

					return def.promise();
				},

				'showHeader' : function ( groupId ) {

					if ( !this.headerController ) {
						this.headerController = new Groups.Show.HeaderController( {
							'layout' : this.layout,
							'model'  : this.model
						} );
					}
					this.headerController.getData( groupId );

				},

				'showGroupLeaderTools' : function ( groupId ) {
					groupId = parseInt( groupId );

					App.when( this.setup( groupId, false ) ).done( _.bind( function () {
						if ( !this.leaderController ) {
							this.leaderController = new Groups.Show.LeaderController( {
								'layout' : this.layout,
								'model'  : this.model
							} );
						}

						this.leaderController.getData( groupId );
					}, this ) );
				},

				'showGroupWall' : function ( groupId ) {

					groupId = parseInt( groupId );

					App.when( this.setup( groupId ) ).done( _.bind( function () {

						if ( !this.wallController ) {

							this.wallController = new Groups.Show.WallController( {
								'layout' : this.layout,
								'model'  : this.model
							} );
						}

						if ( this.model.isMember ) {
							this.layout.groupsContentRegion.show( new App.Common.LoadingView () );
						}

						this.wallController.getData( groupId );

					}, this ) );

				},

				'showGroupMembers' : function ( groupId ) {

					groupId = parseInt( groupId );

					App.when( this.setup( groupId ) ).done( _.bind( function () {

						if ( !this.membersController ) {
							this.membersController = new Groups.Show.MembersController( {
								'layout' : this.layout,
								'model'  : this.model
							} );
						}

						this.layout.groupsContentRegion.show( new App.Common.LoadingView () );
						this.membersController.getData( groupId );

					}, this ) );
				},

				'showGroupInfo' : function ( groupId, location ) {

					location = location || 'tab';
					groupId = parseInt( groupId );

					if ( !this.infoController ) {
						this.infoController = new Groups.Show.SideController( {
							'layout'          : this.layout,
							'model'           : this.model,
							'displayLocation' : location
						} );
					}

					// If we don't have a current view in the info region,
					// we probably need to reset the last group id to make
					// sure it renders again
					if ( !_.has( this.layout.groupInfoRegion, 'currentView') ) {
						this.infoController.lastGroupId = null;
					}

					this.infoController.getData( groupId );

				},

				'showGroupResources' : function ( groupId ) {

					groupId = parseInt( groupId );

					App.when( this.setup( groupId ) ).done( _.bind( function () {

						if ( !this.resourcesController ) {
							this.resourcesController = new Groups.Show.ResourcesController( {
								'layout' : this.layout,
								'model'  : this.model
							} );
						}

						this.layout.groupsContentRegion.show( new App.Common.LoadingView () );
						this.resourcesController.getData( groupId );

					}, this ) );
				},

				'showGroupForums' : function ( groupId ) {

					groupId = parseInt( groupId );

					App.when( this.setup( groupId, false ) ).done( _.bind( function () {
						if ( !this.forumController ) {
							this.forumController = new Groups.Show.ForumController( {
								'layout' : this.layout,
								'model'  : this.model
							} );
						}

						this.forumController.showForums();

					}, this ) );

				},

				'onLayoutClose' : function () {
					this.layout = null;
					this.model = null;

					this.headerController.close();
					this.headerController = null;

					var controllers = [
						'infoController',
						'wallController',
						'resourcesController',
						'forumController',
						'membersController',
						'leaderController'
					];

					_.each( controllers, function ( ctrl ) {
						if ( _.has( this, ctrl ) && this[ ctrl ] ) {
							this[ ctrl ].close();
							this[ ctrl ] = null;
						}
					}, this );

				},

				'listGroups' : function () {
					App.request( 'pd360:hide' );
					Groups.List.Controller.listGroups();
				},

				'createGroup' : function ( model ) {
					App.request( 'pd360:hide' );
					Groups.Show.Controller.createGroup( model );
				},

				'showCreateGroup' : function () {
					App.request( 'pd360:hide' );
					Groups.Create.Controller.showCreateGroup();
				},

				'leaveGroup' : function ( model ) {
					Groups.Edit.Controller.leaveGroup( model );
				},

				'joinGroup' : function ( model ) {
					Groups.Edit.Controller.joinGroup( model );
				},

				'uploadResource' : function ( groupId ) {
					App.request( 'pd360:hide' );

					App.content.show( new App.Common.LoadingView() );

					this.model = new App.Entities.GroupModel( {
						'LicenseId' : groupId
					} );

					App.when( this.model.fetch() ).done( _.bind( function () {

						Groups.Upload.Controller.uploadPage( {
							'groupModel' : this.model
						} );
					}, this ) );
				}
			} );

			Vent.on( 'group:leaveGroup', function ( model ) {
				Groups.Edit.Controller.leaveGroup( model );
			} );

			Vent.on( 'group:joinGroup', function ( model ) {
				Groups.Edit.Controller.joinGroup( model );
			} );

			Vent.on( 'group:ignoreGroup', function ( model ) {
				Groups.Edit.Controller.ignoreGroup( model );
			} );

			Vent.on( 'group:acceptGroup', function ( model ) {
				Groups.Edit.Controller.acceptGroup( model );
			} );

			Vent.on( 'resource:upload', function ( model ) {
				App.navigate( 'groups/' + model.attributes.LicenseId + '/upload', { 'trigger' : true } );
			} );

			App.addInitializer( function () {
				new Groups.Router( {
					'controller' : new APIController()
				} );
			} );

		} );

	};

} );
