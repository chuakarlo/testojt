define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'Groups.Views', function ( Views ) {

		Views.Layout             = require( './GroupLayoutView' );
		Views.GroupListLayout    = require( './overview/GroupListLayoutView' );
		Views.List               = require( './overview/GroupsView' );
		Views.InvitesList        = require( './overview/GroupInvitesView' );
		Views.Banner             = require( './header/GroupBannerView' );
		Views.Header             = require( './header/GroupHeaderView' );
		Views.SubNav             = require( './header/GroupSubNavView' );
		Views.Info               = require( './info/GroupInfoView' );
		Views.Comments           = require( './wall/GroupCommentsView' );
		Views.CommentsCollection = require( './wall/GroupCommentsCollectionView' );
		Views.Members            = require( './members/MembersView' );
		Views.Resources          = require( './resources/GroupResourcesView' );
		Views.ResourcesMembers   = require( './resources/GroupResourcesMembersView' );
		Views.UploadResource     = require( './resources/UploadResourceView' );
		Views.GroupCreate        = require( './create/GroupCreateView' );

	} );

} );
