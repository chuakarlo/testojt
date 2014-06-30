define( function ( require ) {
	'use strict';

	var _    = require( 'underscore' );
	var App  = require( 'App' );
	var Vent = require( 'Vent' );

	App.module( 'Groups.List', function ( List ) {

		var Controller = App.Common.Controllers.BaseController.extend( {

			'initialize' : function () {
				_.bindAll( this, 'showGroups' );
			},

			'listGroups' : function () {

				// show a loading view while data is fetching
				this.layout = new App.Groups.Views.GroupListLayout();

				App.content.show( this.layout );
				this.layout.groupInvitesRegion.show( new App.Common.LoadingView() );

				var groupsRequest  = App.request( 'user:groups' );
				var invitesRequest = App.request( 'user:groups:invites' );

				App.when( groupsRequest, invitesRequest )
					.then( this.showGroups, this.showError );

			},

			'showGroups' : function ( groups, invites ) {

				// If the currentView of the app isn't our layout, they loaded
				// another page and we don't care about the response.
				if ( App.content.currentView !== this.layout ) {
					return;
				}

				var groupsView  = new App.Groups.Views.List( { 'collection' : groups } );
				var invitesView = new App.Groups.Views.InvitesList( { 'collection' : invites } );

				Vent.on( 'group:removeGroupInvites', function ( invite ) {
					invites.remove( invite );
				} );

				this.layout.groupsRegion.show( groupsView );
				this.layout.groupInvitesRegion.show( invitesView );
			},

			'showError' : function ( error ) {

				App.content.show( new App.Common.ErrorView( {
					'message' : error,
					'flash'   : 'An error occurred. Please try again later.'
				} ) );

			}

		} );

		List.Controller = new Controller();

	} );

} );
