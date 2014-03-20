define( function ( require ) {
	'use strict';

	var GroupShow  = require( './controllers/showController' );
	var GroupsList = require( './controllers/listController' );
	var GroupsEdit = require( './controllers/editController' );
	var Vent       = require( 'Vent' );
	var Marionette = require( 'marionette' );

	// ## Groups App
	return function ( Groups, App ) {

		// load group
		App.module( 'Groups.List', GroupsList );
		App.module( 'Groups.Edit', GroupsEdit );
		App.module( 'Groups.Show', GroupShow );

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

	};

} );
