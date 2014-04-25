define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	var VideoResourceItemView = require( 'videoPlayer/views/tabs/VideoResourceItemView' );

	describe( 'VideoResource ItemView', function () {
		var videoResource;
		var videoResourceItemView;

		//set up and teardown test data - additional resources- video resource
		before( function () {
			videoResource = new Backbone.Model( {
				'downloadPath' : 'thisurl',
				'previewPath'  : 'thisurl',
				'thumbnail'    : ''
			} );

			videoResourceItemView = new VideoResourceItemView( {
				'model' : videoResource
			} );

			videoResourceItemView.render();
		} );

		describe( 'Video Resource ItemView', function () {

			it( 'does have  instance of VideoResourceItemView', function () {
				videoResourceItemView.should.be.an.instanceof( VideoResourceItemView );
			} );

			it( 'does have  `template` property', function () {
				videoResourceItemView.should.have.property( 'template' );
			} );

			it( 'does have  `tagName` property', function () {
				videoResourceItemView.should.have.property( 'tagName' );
			} );

			it( 'does have  `ui` property', function () {
				videoResourceItemView.should.have.property( 'ui' );
			} );

			it( 'should have an `tagName` property with value `LI`', function () {
				videoResourceItemView.should.have.property( 'tagName' );
				videoResourceItemView.tagName.should.equal( 'li' );
			} );

			it( 'should create a `DIV` element', function () {
				videoResourceItemView.el.nodeName.should.equal( 'LI' );
			} );

		} );

		describe( 'Data Model stored in itemView', function () {

			it( 'should have the same data to the data being passed', function () {
				videoResourceItemView.model.should.equal( videoResource );
			} );

		} );

		describe( '.showPdfModal', function () {

			before( function () {
				videoResourceItemView.showPdfModal();
			} );

			it( 'should show a modal', function () {
				videoResourceItemView.ui.pdfModal.modal( 'show' );
				var $modal = videoResourceItemView.$el.find( '.modal' );
				$modal.should.have.length( 1 );
			} );

		} );

	} );

} );