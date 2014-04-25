define( function ( require ) {
	'use strict';

	var sinon = window.sinon;
	var $     = require( 'jquery' );

	var VideoCollectionView = require( 'videoPlayer/views/tabs/VideoCollectionView' );
	var RelatedVideoCollection = require( 'videoPlayer/collections/RelatedVideoCollection' );

	describe( 'VideoCollectionView', function ( ) {
		var videosCollectionView;
		var testData;
		var testCollection;

		before( function ( ) {
			testData = [ {
				'ContentName' : '',
				'ContentId'   : ''
			} ];

			testCollection = new RelatedVideoCollection( testData );
			videosCollectionView = new VideoCollectionView( {
				'collection': testCollection
			} );
			videosCollectionView.render();
		} );

		after( function() {
			videosCollectionView = null;
		} );


		describe( '#videosCollectionView', function ( ) {
			it( 'is an instance', function ( ) {
				videosCollectionView.should.be.an.instanceof( VideoCollectionView );
			} );

			it( 'has `itemView` property', function ( ) {
				videosCollectionView.should.have.property( 'itemView' );
			} );

			it( 'has a `className` property with value `slick`', function ( ) {
				videosCollectionView.should.have.property( 'className' );
				videosCollectionView.className.should.be.equal( 'slick' );
			} );

			it( 'has a `tagName` property with value `div`', function ( ) {
				videosCollectionView.should.have.property( 'tagName' );
				videosCollectionView.tagName.should.be.equal( 'div' );
			} );
		} );



		describe( '.onShow', function ( ) {
			var slickSpy;

			before( function () {
				slickSpy     = sinon.spy( $.fn , 'slick' );

				videosCollectionView.onShow();
			} );

			after( function ( ) {
				slickSpy.reset();
			} );

			it( 'will call .slick' , function ( ) {
				slickSpy.callCount.should.be.at.least( 1 );
			} );
		} );

		describe( '.onClose', function ( ) {
			it( 'will reset the collection' , function ( ) {
				videosCollectionView.onClose();
				videosCollectionView.collection.length.should.be.equal( 0 );
			} );
		} );

	} );

} );
