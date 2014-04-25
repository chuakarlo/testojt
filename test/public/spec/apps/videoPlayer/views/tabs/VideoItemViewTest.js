define( function ( require ) {
	'use strict';

	var sinon = window.sinon;

	var Video = require( 'videoPlayer/models/RelatedVideoModel' );
	var VideoView = require( 'videoPlayer/views/tabs/VideoItemView' );

	describe( 'VideoItemView', function () {
		var fakeData;
		var video;
		var videoView;
		var stubimageUrl;

		before( function () {
			fakeData = {
				'ImageURL'               : '',
				'SegmentLengthInSeconds' : '',
				'ContentName'            : '',
				'ContentId'              : 1
			};

			video     = new Video();
			video.set( fakeData );

			videoView = new VideoView( {
				'model' : video,
			} );

			stubimageUrl = sinon.stub( videoView.templateHelpers, 'imageUrl' ).returns( '' );

			videoView.render();
		} );

		after( function () {
			videoView.templateHelpers.imageUrl.restore();
			videoView = null;
		} );

		it( 'should invoke imageUrl', function () {
			stubimageUrl.should.have.callCount( 1 );
		} );

		it( 'should return duration', function () {
			var children = videoView.$el.children();
			var p = children.last().find( 'p' ).val();
			p.should.have.be.equal( '' );
		} );

	} );

} );