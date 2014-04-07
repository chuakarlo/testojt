define ( function ( require ) {
	'use strict';

	var RelatedVideoItemView = require( 'videoPlayer/views/tabs/RelatedVideoItemView' );
	var RelatedVideoModel    = require( 'videoPlayer/models/RelatedVideoModel' );

	describe( 'RelatedVideo ItemView', function () {
		var relatedVideo;
		var relatedVideoView;

		//set up and teardown test data - related video
		before( function  () {
			relatedVideo = new RelatedVideoModel( {
				'url'         : '',
				'ContentName' : '',
				'duration'    : ''
			} );
			relatedVideoView = new RelatedVideoItemView( {
				model : relatedVideo
			} );
			relatedVideoView.render();
		} );

		/**
		 * Verify that the view is an instance of the relatedVideo itemview
		 */
		describe( '#relatedVideo', function () {

			it( 'is an instance of relatedVideoTheView', function () {
				relatedVideoView.should.be.an.instanceof( RelatedVideoItemView );
			} );
			it( 'has a `template` property' , function () {
				relatedVideoView.should.have.property( 'template' );
			} );

			it( 'has a `tagName` property with value `DIV`' , function () {
				relatedVideoView.should.have.property( 'tagName' );
				relatedVideoView.tagName.should.equal( 'div' );
			} );

			it( 'has a `DIV` element' , function () {
				relatedVideoView.el.nodeName.should.equal( 'DIV' );
			} );

		} );

		/**
		 * Verify that the model  in item view
		 */
		describe( '#relatedVideo.model', function () {
			/**
			 * model is the same to that of data being set at the beginning
			 */
			it( 'has data equal to data being set', function () {
				relatedVideoView.model.should.equal( relatedVideo );
			} );
			/**
			 * model in the view is an instance of RelatedContentModel
			 */
			it( 'is an instance of the RelatedContentModel', function () {
				relatedVideoView.model.should.be.an.instanceof( RelatedVideoModel );
			} );

		} );

	} );

} );
