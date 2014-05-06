define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'Groups.Views', function ( Views ) {

		Views.Layout             = require( './GroupLayoutView' );
		Views.GroupListLayout    = require( './GroupListLayoutView' );
		Views.List               = require( './GroupsView' );
		Views.InvitesList        = require( './GroupInvitesView' );
		Views.Banner             = require( './GroupBannerView' );
		Views.Header             = require( './GroupHeaderView' );
		Views.Info               = require( './GroupInfoView' );
		Views.SubNav             = require( './GroupSubNavView' );
		Views.Comments           = require( './GroupCommentsView' );
		Views.CommentCreate      = require( './GroupCommentCreateView' );
		Views.CommentsCollection = require( './GroupCommentsCollectionView' );
		Views.Members            = require( './MembersView' );
		Views.Resources          = require( './GroupResourcesView' );
		Views.ResourcesMembers   = require( './GroupResourcesMembersView' );

	} );

} );
