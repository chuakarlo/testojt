define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );
	var Session    = require( 'Session' );

	require( 'groups/controllers/listController' );
	require( 'groups/controllers/editController' );
	require( 'groups/controllers/wallController' );
	require( 'groups/controllers/headerController' );
	require( 'groups/controllers/sideController' );
	require( 'groups/controllers/resourcesController' );
	require( 'groups/controllers/membersController' );

	require( 'groups/views/Views' );
	require( 'common/controllers/BaseController' );

	// ## Groups App
	App.module( 'Groups', function ( Groups ) {

		var AuthRouter = require( 'AuthRouter' );
		// load group
		require( 'groups/controllers/listController' );
		require( 'groups/controllers/editController' );
		require( 'groups/views/Views' );
		require( 'groups/entities/GroupCollection' );
		require( 'groups/entities/GroupInviteCollection' );

		// configure groups routes
		Groups.Router = AuthRouter.extend( {

			'appRoutes' : {
				'groups'                    : 'listGroups',
				'groups/:groupId'           : 'showGroupWall',
				'groups/:groupId/wall'      : 'showGroupWall',
				'groups/:groupId/forums'    : 'showGroupForums',
				'groups/:groupId/resources' : 'showGroupResources',
				'groups/:groupId/members'   : 'showGroupMembers',
				'groups/:groupId/info'      : 'showGroupInfo',
				'groups/:groupId/leader'    : 'showGroupLeaderTools',
				'groups.create'             : 'showCreateGroup'
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

			'setup' : function ( groupId ) {
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

					if ( !this.headerController ) {
						this.headerController = new Groups.Show.HeaderController( {
							'layout' : this.layout,
							'model'  : this.model
						} );
					}

					if ( !this.sideController ) {
						this.sideController = new Groups.Show.SideController( {
							'layout' : this.layout,
							'model'  : this.model
						} );
					}

					def.resolve();
				}, this ) );

				return def.promise();
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

					var controllers = [
						this.headerController,
						this.sideController,
						this.wallController
					];

					_.each( controllers, function ( ctrl ) {
						if ( ctrl.lastGroupId !== groupId ) {
							ctrl.getData( groupId );
						}
					} );

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

					var controllers = [
						this.headerController,
						this.sideController,
						this.membersController
					];

					_.each( controllers, function ( ctrl ) {
						if ( ctrl.lastGroupId !== groupId ) {
							ctrl.getData( groupId );
						}
					} );

				}, this ) );
			},

			'showGroupInfo' : function ( groupId ) {
				groupId = parseInt( groupId );

				App.when( this.setup( groupId ) ).done( _.bind( function () {

					if ( !this.infoController ) {
						this.infoController = new Groups.Show.SideController( {
							'layout'          : this.layout,
							'model'           : this.model,
							'displayLocation' : 'tab'
						} );
					}

					var controllers = [
						this.headerController,
						this.sideController,
						this.infoController
					];

					_.each( controllers, function ( ctrl ) {
						if ( ctrl.lastGroupId !== groupId ) {
							ctrl.getData( groupId );
						}
					} );
				}, this ) );
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

					var controllers = [
						this.headerController,
						this.sideController,
						this.resourcesController
					];

					_.each( controllers, function ( ctrl ) {
						if ( ctrl.lastGroupId !== groupId ) {
							ctrl.getData( groupId );
						}
					} );

				}, this ) );
			},

			'showGroupForums' : function ( groupId ) {
				App.navigate( 'resources/communities/5/' + groupId, {
					'trigger' : true
				} );
			},

			'onLayoutClose' : function () {
				this.layout = null;
				this.model = null;

				this.headerController.close();
				this.headerController = null;

				this.sideController.close();
				this.sideController = null;

				if ( this.wallController ) {
					this.wallController.close();
					this.wallController = null;
				}

				if ( this.membersController ) {
					this.membersController.close();
					this.membersController = null;
				}

				if ( this.resourcesController ) {
					this.resourcesController.close();
					this.resourcesController = null;
				}
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
				Groups.Show.Controller.showCreateGroup();
			},

			'leaveGroup' : function ( model ) {
				Groups.Edit.Controller.leaveGroup( model );
			},

			'joinGroup' : function ( model ) {
				Groups.Edit.Controller.joinGroup( model );
			},

			'ignoreGroup' : function ( model ) {
				Groups.Edit.Controller.ignoreGroup( model );
			},

			'acceptGroup' : function ( model ) {
				Groups.Edit.Controller.acceptGroup( model );
			},

			'showGroupLeaderTools' : function ( groupId ) {

				if ( !this.model || this.model.get( 'LicenseId') !== groupId ) {

					this.model = new App.Entities.GroupModel( {
						'LicenseId' : groupId
					} );
				}

				App.when( this.model.fetch() ).done( _.bind( function () {
					var persId = Session.personnelId();
					var pd360Loaded = App.request( 'pd360:loaded' );

					App.content.show( new App.Common.LoadingView() );

					App.when(
						this.model.userIsAdmin( persId ),
						this.model.userIsCreator( persId ),
						pd360Loaded
					).done( function ( groupAdmin, groupCreator ) {

						if ( groupAdmin === true || groupCreator === true ) {
							App.content.close();
							App.request( 'pd360:navigate', 'communities', 'groupsBrowse', {
								'LicenseId' : groupId
							} );
						} else {
							App.navigate( 'home', {
								'trigger' : true
							} );
						}
					} );
				}, this ) );

			}
		} );

		Vent.on( 'group:leaveGroup', function ( model ) {
			return APIController.leaveGroup( model );
		} );

		Vent.on( 'group:joinGroup', function ( model ) {
			return APIController.joinGroup( model );
		} );

		Vent.on( 'group:ignoreGroup', function ( model ) {
			return APIController.ignoreGroup( model );
		} );

		Vent.on( 'group:acceptGroup', function ( model ) {
			return APIController.acceptGroup( model );
		} );

		App.addInitializer( function () {
			new Groups.Router( {
				'controller' : new APIController()
			} );
		} );

	} );

} );
