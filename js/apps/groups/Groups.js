define( function ( require ) {
	'use strict';

	var Vent = require( 'Vent' );
	var App  = require( 'App' );

	// ## Groups App
	App.module( 'Groups', function ( Groups ) {

		var AuthRouter = require( 'AuthRouter' );
		// load group
		require( 'groups/controllers/listController' );
		require( 'groups/controllers/editController' );
		require( 'groups/controllers/showController' );
		require( 'groups/views/Views' );
		require( 'groups/entities/GroupCollection' );
		require( 'groups/entities/GroupInviteCollection' );
		require( 'groups/entities/GroupAdmin' );

		// configure groups routes
		Groups.Router = AuthRouter.extend( {

			'appRoutes' : {
				'groups'                 : 'listGroups',
				'groups/:groupId'        : 'showGroup',
				'groups/:groupId/leader' : 'showLeaderTools',
				'groups.create'          : 'showCreateGroup'
			}

		} );

		var API = {

			'checkSession' : function ( args, callback ) {
				App.request( 'session:checkSession', args, callback );
			},

			'listGroups' : function () {
				App.request( 'pd360:hide' );
				Groups.List.Controller.listGroups();
			},

			'showGroup' : function ( groupID ) {
				App.request( 'pd360:hide' );
				Groups.Show.Controller.showGroup( groupID );
			},

			'showLeaderTools' : function ( groupID ) {

				var userIsGroupAdmin   = App.request( 'groups:isGroupAdmin', groupID );
				var userIsGroupCreator = App.request( 'groups:isGroupCreator', groupID );

				App.when( userIsGroupAdmin, userIsGroupCreator ).done( function ( groupAdmin, groupCreator ) {

					if ( groupAdmin === true || groupCreator === true ) {

						var pd360Loaded = App.request( 'pd360:loaded' );

						App.content.show( new App.Common.LoadingView() );

						App.when( pd360Loaded ).done( function () {
							App.content.close();
							App.request( 'pd360:navigate', 'communities', 'groupsBrowse', {
								'LicenseId' : groupID
							} );
						} );

					} else {
						App.navigate( 'home', { 'trigger' : true } );
						return false;
					}

				} );

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

			'replyComment' : function ( message ) {
				Groups.Edit.Controller.replyComment( message );
			}
		};

		Vent.on( 'group:show', function ( model ) {
			App.navigate( 'groups/' + model.attributes.LicenseId, { 'trigger' : true } );
		} );

		Vent.on( 'group:showCreateGroup', function () {
			App.navigate( 'groups.create', { 'trigger' : true } );
		} );

		Vent.on( 'group:listGroups', function () {
			App.navigate( 'groups', { 'trigger' : true } );
		} );

		// set handler to navigate to group forums through communities app
		App.reqres.setHandler( 'group:showForums', function ( LicenseId ) {
			App.navigate( 'resources/communities/5/' + LicenseId, { 'trigger' : true } );
		} );

		Vent.on( 'group:createGroup', function ( model ) {
			return API.createGroup( model );
		} );

		Vent.on( 'group:leaveGroup', function ( model ) {
			return API.leaveGroup( model );
		} );

		Vent.on( 'group:joinGroup', function ( model ) {
			return API.joinGroup( model );
		} );

		Vent.on( 'group:ignoreGroup', function ( model ) {
			return API.ignoreGroup( model );
		} );

		Vent.on( 'group:acceptGroup', function ( model ) {
			return API.acceptGroup( model );
		} );

		Vent.on( 'group:replyComment', function ( message ) {
			return API.replyComment( message );
		} );

		App.addInitializer( function () {
			new Groups.Router( {
				'controller' : API
			} );
		} );

	} );

} );
