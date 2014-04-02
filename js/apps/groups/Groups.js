define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );

	// ## Groups App
	App.module( 'Groups', function ( Groups ) {

		// load group
		require( 'groups/controllers/listController' );
		require( 'groups/controllers/editController' );
		require( 'groups/controllers/showController' );
		require( 'groups/views/Views' );

		// configure groups routes
		Groups.Router = Marionette.MiddlewareRouter.extend( {

			'appRoutes' : {
				'groups'          : [ 'checkSession', 'listGroups' ],
				'groups/:groupId' : [ 'checkSession', 'showGroup' ]
			}

		} );

		var API = {

			'checkSession' : function ( args, callback ) {
				App.request( 'session:checkSession', args, callback );
			},

			'listGroups' : function ( error, results, args ) {
				Groups.List.Controller.listGroups();
			},

			'showGroup' : function ( error, results, args ) {
				Groups.Show.Controller.showGroup( args[ 0 ] );
			},

			'leaveGroup' : function ( model ) {
				Groups.Edit.Controller.leaveGroup( model );
			},

			'joinGroup' : function ( model) {
				Groups.Edit.Controller.joinGroup( model );
			}
		};

		Vent.on( 'group:show', function ( model ) {
			App.navigate( 'groups/' + model.attributes.LicenseId, { 'trigger' : true } );
		} );

		Vent.on( 'group:getMembers', function ( licenseId ) {
			return API.getMembers( licenseId );
		} );

		Vent.on( 'group:leaveGroup', function ( model ) {
			return API.leaveGroup( model );
		} );

		Vent.on( 'group:joinGroup', function ( model ) {
			return API.joinGroup( model );
		} );

		App.addInitializer( function () {
			new Groups.Router( {
				'controller' : API
			} );
		} );

	} );

} );
