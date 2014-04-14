define( function ( require ) {
	'use strict';

	var PlayerItemView = require( 'videoPlayer/views/player/VideoPlayerView' );

	describe( 'VideoPlayerView', function () {
		var playerItemView = new PlayerItemView();

		it( 'is an instance', function () {
			playerItemView.should.be.an.instanceof( PlayerItemView );
		} );

	} );

} );
