define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var _          = require( 'underscore' );
	var Backbone   = require( 'backbone' );

	require( 'groups/views/GroupResourcesLayout');
	require( 'common/controllers/BaseController' );

	App.module( 'Groups.Show', function ( Mod ) {

		Mod.ResourcesController = App.Common.Controllers.BaseController.extend( {

			'initialize' : function ( options ) {
				this.layout = options.layout || null;
				this.model = options.model;
				this.lastGroupId = null;

				_.bindAll( this, 'showGroup');
			},

			'getData' : function ( groupId ) {
				App.when(
					this.model.getLeaderResources(),
					this.model.getMemberResources(),
					this.model.getLeaderLinks(),
					this.model.getMemberLinks()
				).done( this.showGroup );

			},

			'showGroup' : function (
					leaderResourcesCollection,
					memberResourcesCollection,
					leaderLinkCollection,
					memberLinkCollection
				) {

				var resourcesLayout = new App.Groups.Views.GroupResourcesLayout( {
					'groupModel' : this.model
				} );

				this.layout.groupsContentRegion.show( resourcesLayout );

				var leaderCollection = new Backbone.Collection();

				leaderCollection.add( leaderResourcesCollection.models );
				leaderCollection.add( leaderLinkCollection.models );

				var resourcesView = new App.Groups.Views.Resources( {
					'collection' : leaderCollection
				} );

				resourcesLayout.leaderRegion.show( resourcesView );

				var memberCollection = new Backbone.Collection();

				memberCollection.add( memberResourcesCollection.models );
				memberCollection.add( memberLinkCollection.models );

				var resourcesMembersView = new App.Groups.Views.ResourcesMembers( {
					'collection' : memberCollection
				} );

				resourcesLayout.memberRegion.show( resourcesMembersView );

			}

		} );

	} );

} );
