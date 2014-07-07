define( function ( require ) {
	'use strict';

	var _       = require( 'underscore' );
	var App     = require( 'App' );
	var Session = require( 'Session' );

	require( 'common/controllers/BaseController' );

	App.module( 'Groups.Show', function ( Mod ) {

		Mod.MembersController = App.Common.Controllers.BaseController.extend( {

			'initialize' : function ( options ) {
				this.layout = options.layout;
				this.model = options.model;
				_.bindAll( this, 'showGroup' );
			},

			'getData' : function ( groupId ) {
				App.when(
					this.model.getMembers( 100 ),
					this.model.userIsGroupMember( Session.personnelId() )
				).done( this.showGroup );
			},

			'showGroup' : function ( collection, isMember ) {

				if ( this.getCurrentPage() === 'members' ) {

					var membersView = new App.Groups.Views.Members( {
						'model'      : this.model,
						'collection' : collection
					} );

					if ( isMember[ 0 ] ) {
						this.layout.groupsContentRegion.show( membersView );
					}

				}

			}

		} );

	} );

} );
