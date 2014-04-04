define( function ( require ) {
	'use strict';

	var PlayerItemView = require( 'videoPlayer/views/player/PlayerItemView' );

	describe( 'PlayerItemView Item', function () {
		var playerItemView = new PlayerItemView();

		it( 'should be an instance of PlayerItemView', function () {
			playerItemView.should.be.an.instanceof( PlayerItemView );
		} );

	} );

} );
