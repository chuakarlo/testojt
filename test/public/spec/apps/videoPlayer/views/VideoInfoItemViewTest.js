define( function ( require ) {
	'use strict';


	var Content   = require( 'videoPlayer/models/ContentModel' );
	var VideoView = require( 'videoPlayer/views/VideoInfoItemView' );

	describe( 'VideoInfoItemView', function () {
		var videoView;
		var content;
		var fakeData;

		before( function () {
			fakeData = {
				'SegmentLengthInSeconds' : '',
				'ContentDescription'     : ''
			};
			content = new Content();
			content.set( fakeData );

			videoView = new VideoView( {
				'model': content
			} );

			videoView.render();
		} );

		after( function () {
			videoView = null;
		} );

		it( 'should return duration', function() {
			var domDiv = videoView.$el.children().last();
			var p = domDiv.children().last().text();
			p.should.have.be.equal( 'Duration: 00:00:00' );
		} );

		it( 'should call `.showVideoInfo` when video info is click', function ( done ) {
			var domDiv = videoView.$el.children();
			domDiv.first().click( function () {
				done();
			} );

			domDiv.first().trigger( 'click' );
		} );

	} );

} );