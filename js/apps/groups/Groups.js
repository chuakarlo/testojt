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

		// configure groups routes
		Groups.Router = AuthRouter.extend( {

			'appRoutes' : {
				'groups'          : 'listGroups',
				'groups/:groupId' : 'showGroup'
			}

		} );

		var API = {

			'checkSession' : function ( args, callback ) {
				App.request( 'session:checkSession', args, callback );
			},

			'listGroups' : function () {
				Groups.List.Controller.listGroups();
			},

			'showGroup' : function ( groupID ) {
				Groups.Show.Controller.showGroup( groupID );
			},

			'leaveGroup' : function ( model ) {
				Groups.Edit.Controller.leaveGroup( model );
			},

			'joinGroup' : function ( model) {
				Groups.Edit.Controller.joinGroup( model );
			},

			'replyComment' : function ( message ) {
				Groups.Edit.Controller.replyComment( message );
			}
		};

		Vent.on( 'group:show', function ( model ) {
			App.navigate( 'groups/' + model.attributes.LicenseId, { 'trigger' : true } );
		} );

		Vent.on( 'group:leaveGroup', function ( model ) {
			return API.leaveGroup( model );
		} );

		Vent.on( 'group:joinGroup', function ( model ) {
			return API.joinGroup( model );
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
