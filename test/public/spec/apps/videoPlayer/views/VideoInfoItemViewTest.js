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

			videoView.render();
		} );

		after( function () {
			videoView = null;
		} );

		it( 'should return duration', function () {
			var domDiv = videoView.$el.children().last();
			var p      = domDiv.children().last().text();
			p.should.have.be.equal( 'Duration: 00:00:00' );
		} );

		it( 'should call `.showVideoInfo` when video info is click', function () {
			var domDiv = videoView.$el.children();
			domDiv.first().click( function () {
				domDiv.first().next().hasClass( 'popover' ).should.be.true();
			} );
		} );

		it( 'should hide `.showVideoInfo` when transparent backdrop is click', function () {
			var domDiv = videoView.$el.children();
			domDiv.first().next().next().click( function () {
				domDiv.first().next().hasClass( 'in' ).should.be.false();
			} );
		} );

	} );

} );
