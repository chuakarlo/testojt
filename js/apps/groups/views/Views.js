define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'Groups.Views', function ( Views ) {

		Views.Layout   = require( './GroupLayoutView' );
		Views.List     = require( './GroupsView' );
		Views.Banner   = require( './GroupBannerView' );
		Views.Header   = require( './GroupHeaderView' );
		Views.Comments = require( './GroupCommentsView' );

	} );
	
} );
