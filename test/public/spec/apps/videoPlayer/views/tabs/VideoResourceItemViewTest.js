define( function ( require ) {
	'use strict';

	var VideoResourceItemView = require( 'videoPlayer/views/tabs/VideoResourceItemView' );
	var VideoResourceModel    = require( 'videoPlayer/models/VideoResourceModel' );

	describe( 'VideoResource ItemView', function () {
		var videoResource;
		var videoResourceItemView;

		//set up and teardown test data - additional resources- video resource
		before( function () {
			videoResource = new VideoResourceModel( {
				'downloadPath' : '',
				'previewPath'  : '',
				'thumbnail'    : ''
			} );

			videoResourceItemView = new VideoResourceItemView( {
				'model' : videoResource
			} );

			videoResourceItemView.render();
		} );

		/**
		 * Verify that the view is an instance of the video resource itemview
		 */
		describe( 'Video Resource ItemView', function () {

			it( 'should be an instance of VideoResourceItemView', function () {
				videoResourceItemView.should.be.an.instanceof( VideoResourceItemView );
			} );

			it( 'should have an `template` property', function () {
				videoResourceItemView.should.have.property( 'template' );
			} );

			it( 'should have an `tagName` property', function () {
				videoResourceItemView.should.have.property( 'tagName' );
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
				videoResourceItemView.should.have.property( 'template' );
			} );
			/**
			 * assert that it has a property name tagName
			 */
			it( 'should have an `tagName` property with value `LI`', function () {
				videoResourceItemView.should.have.property( 'tagName' );
				videoResourceItemView.tagName.should.equal( 'li' );
			} );

			/**
			 * assert that it will create a li node element
			 */
			it( 'should create a `LI` element', function () {
				videoResourceItemView.el.nodeName.should.equal( 'LI' );
			} );

		} );

		/**
		 * Verify that the model  in item view
		 */
		describe( 'Data Model stored in itemView', function () {
			/**
			 * model is the same to that of data being set at the beginning
			 */
			it( 'should have the same data to the data being passed', function () {
				videoResourceItemView.model.should.equal( videoResource );
			} );
			/**
			 * model in the view is an instance of VideoResourceModel
			 */
			it( 'should be an instance of the VideoResourceModel', function () {
				videoResourceItemView.model.should.be.an.instanceof( VideoResourceModel );
			} );

		} );
	} );

} );
