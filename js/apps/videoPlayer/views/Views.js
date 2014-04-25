define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'VideoPlayer.Views', function ( Views ) {

		Views.PageLayout            = require( 'videoPlayer/views/VideoPageLayout' );
		Views.QuestionsView         = require( 'videoPlayer/views/QuestionsCompositeView' );
		Views.NoItemView            = require( 'videoPlayer/views/NoItemView' );
		Views.VideoPlayerView       = require( 'videoPlayer/views/player/VideoPlayerView' );
		Views.VideoTabsView         = require( 'videoPlayer/views/tabs/TabsItemView' );
		Views.VideoButtonsView      = require( 'videoPlayer/views/tabs/ButtonsItemView' );
		Views.VideoCollectionView   = require( 'videoPlayer/views/tabs/VideoCollectionView' );
		Views.ResourcesView         = require( 'videoPlayer/views/tabs/VideoResourcesCollectionView' );
		Views.VideoInfoView         = require( 'videoPlayer/views/VideoInfoItemView' );
		Views.ShareVideoLayout      = require( 'videoPlayer/views/share/ShareVideoLayout' );
		Views.SharedVideoView       = require( 'videoPlayer/views/share/SharedVideoItemView' );
		Views.SearchResultsTreeView = require( 'videoPlayer/views/share/SearchResultsTreeView' );
		Views.SearchResultsTreeRoot = require( 'videoPlayer/views/share/SearchResultsTreeRoot' );
		Views.SelectedItemsView     = require( 'videoPlayer/views/share/SelectedItemsCollectionView' );
		Views.SelectedItemView      = require( 'videoPlayer/views/share/SelectedItemView' );

	} );

} );
