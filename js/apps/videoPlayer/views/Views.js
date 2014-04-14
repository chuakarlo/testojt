define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'VideoPlayer.Views', function ( Views ) {

		Views.PageLayout      = require( 'videoPlayer/views/VideoPageLayout' );
		Views.VideoPlayerView = require( 'videoPlayer/views/player/VideoPlayerView' );

	} );

} );
