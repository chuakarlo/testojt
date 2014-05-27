define( function ( require ) {
	'use strict';

	var Backbone  = require( 'backbone' );
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
			content = new Backbone.Model( fakeData );

			videoView = new VideoView( {
				'model' : content
			} );

		} );

		after( function () {
			videoView = null;
		} );

		it( 'does have a `template`', function () {
			videoView.should.have.property( 'template' );
		} );

		it( 'does have a `className`', function () {
			videoView.should.have.property( 'className' );
		} );

		it( 'does have `templateHelpers`', function () {
			videoView.should.have.property( 'templateHelpers' );
		} );

		it( 'should call `.showVideoInfo` when video info is click', function () {
			var domDiv = videoView.$el.children();
			domDiv.first().click( function () {
				domDiv.first().next().hasClass( 'modal' ).should.be.true();
			} );
		} );

	} );

} );
