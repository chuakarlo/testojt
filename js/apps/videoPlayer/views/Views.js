define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'VideoPlayer.Views', function ( Views ) {

		Views.PageLayout           = require( 'videoPlayer/views/VideoPageLayout' );
		Views.QuestionsView        = require( 'videoPlayer/views/question/QuestionsCompositeView' );
		Views.SegmentLabelItemView = require( 'videoPlayer/views/SegmentLabelItemView' );
		Views.VideoPlayerView      = require( 'videoPlayer/views/player/VideoPlayerView' );
		Views.VideoTabsView        = require( 'videoPlayer/views/tabs/TabsItemView' );
		Views.VideoButtonsView     = require( 'videoPlayer/views/tabs/ButtonsItemView' );
		Views.ResourcesView        = require( 'videoPlayer/views/tabs/VideoResourcesCollectionView' );
		Views.VideoInfoView        = require( 'videoPlayer/views/VideoInfoItemView' );

	} );

} );
