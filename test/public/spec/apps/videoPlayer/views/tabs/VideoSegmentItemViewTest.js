define( function ( require ) {
	'use strict';

	var VideoSegmentItemView = require( 'videoPlayer/views/tabs/VideoSegmentItemView' );
	var VideoSegmentModel    = require( 'videoPlayer/models/VideoSegmentModel' );

	describe( 'VideoSegment ItemView', function () {
		var videoSegment;
		var videoSegmentItemView;
		var videoSegmentTheView;
		//set up and teardown test data - additional resources- video segment
		before( function () {
			videoSegment = new VideoSegmentModel( {
				'ContentName'    : '',
				'duration' : '',
				'url'     : ''
			} );

			videoSegmentItemView = new VideoSegmentItemView( {
				model : videoSegment
			} );
			videoSegmentTheView = videoSegmentItemView.render();
		} );

		after( function () {
			videoSegmentItemView = null;
		} );

		/**
		 * Verify that the view is an instance of the video segment itemview
		 */
		describe( 'Video Segment ItemView', function () {

			it( 'should be an instance of VideoSegmentItemView', function () {
				videoSegmentItemView.should.be.an.instanceof( VideoSegmentItemView );
			} );

		} );

		/**
		 * Verify that the view creates an element based on the itemview
		 */
		describe( 'Instantiation', function () {
			/**
			 * assert that it should have a property template
			 */
			it( 'should have an `template` property', function () {
				videoSegmentItemView.should.have.property( 'template' );
			} );
			/**
			 * assert that it has a property name tagName
			 */
			it( 'should have an `tagName` property with value `DIV`', function () {
				videoSegmentItemView.should.have.property( 'tagName' );
				videoSegmentItemView.tagName.should.equal( 'div' );
			} );

			/**
			 * assert that it will create a li node element
			 */
			it( 'should create a `DIV` element', function () {
				videoSegmentItemView.el.nodeName.should.equal( 'DIV' );
			} );
		} );

		/**
		 * Verify that the model  in item view
		 */
		describe( 'Data Model stored in itemView', function() {
			/**
			 * model is the same to that of data being set at the beginning
			 */
			it( 'should have the same data to the data being passed', function() {
				videoSegmentItemView.model.should.equal( videoSegment );
			} );
			/**
			 * model in the view is an instance of VideoSegmentModel
			 */
			it( 'should be an instance of the VideoSegmentModel', function() {
				videoSegmentItemView.model.should.be.an.instanceof( VideoSegmentModel );
			} );

		} );
	} );
} );
