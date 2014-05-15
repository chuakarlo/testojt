define( function ( require ) {
	'use strict';

	var $     = require( 'jquery' );
	var sinon = window.sinon;

	var VideoCollectionView    = require( 'videoPlayer/views/tabs/VideoCollectionView' );
	var RelatedVideoCollection = require( 'videoPlayer/collections/RelatedVideoCollection' );

	require( 'common/views' );

	describe( 'VideoCollectionView', function ( ) {

		var videosCollectionView;
		var testData;
		var testCollection;

		before( function ( ) {
			testData = [ {
				'ImageURL'               : '',
				'SegmentLengthInSeconds' : '',
				'ContentName'            : '',
				'ContentId'              : 1
			} ];

			testCollection = new RelatedVideoCollection();
			testCollection.reset( testData );

			VideoCollectionView.prototype.onBeforeItemAdded = function ( itemView ) {
				sinon.stub( itemView.templateHelpers, 'imageUrl' ).returns( '' );
			};
			VideoCollectionView.prototype.onItemRemoved = function ( itemView ) {
				itemView.templateHelpers.imageUrl.restore();
			};

			videosCollectionView = new VideoCollectionView( {
				'collection' : testCollection
			} );

		} );

		after( function () {
			videosCollectionView.remove();
			videosCollectionView = undefined;
		} );

		describe( '#videosCollectionView', function ( ) {

			it( 'is an instance', function ( ) {
				videosCollectionView.should.be.an.instanceof( VideoCollectionView );
			} );

			it( 'has `itemView` property', function ( ) {
				videosCollectionView.should.have.property( 'itemView' );
			} );

			it( 'has a `className` property with value `row`', function ( ) {
				videosCollectionView.should.have.property( 'className' );
				videosCollectionView.className.should.be.equal( 'row' );
			} );

			it( 'has a `tagName` property with value `ul`', function ( ) {
				videosCollectionView.should.have.property( 'tagName' );
				videosCollectionView.tagName.should.be.equal( 'ul' );
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
