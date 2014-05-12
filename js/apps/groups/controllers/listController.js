define( function ( require ) {
	'use strict';

	var App  = require( 'App' );
	var Vent = require( 'Vent' );

	App.module( 'Groups.List', function ( List ) {

		var showGroups = function ( groups, invites ) {

			var layout = new App.Groups.Views.GroupListLayout();
			App.content.show( layout );

			var groupsView  = new App.Groups.Views.List( { 'collection' : groups } );
			var invitesView = new App.Groups.Views.InvitesList( { 'collection' : invites } );

			Vent.on( 'group:removeGroupInvites', function ( invite ) {
				invites.remove( invite );
			} );

			layout.groupsRegion.show( groupsView );
			layout.groupInvitesRegion.show( invitesView );

		};

		var showError = function ( error ) {

			App.content.show( new App.Common.ErrorView( {
				'message' : error,
				'flash'   : 'An error occurred. Please try again later.'
			} ) );

		};

		List.Controller = {

			'listGroups' : function () {

				// show a loading view while data is fetching
				App.content.show( new App.Common.LoadingView() );

				var groupsRequest  = App.request( 'user:groups' );
				var invitesRequest = App.request( 'user:groups:invites' );

				App.when( groupsRequest, invitesRequest ).then( showGroups, showError );

			}

		};

	} );

} );
