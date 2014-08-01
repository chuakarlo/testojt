define( function ( require ) {
	'use strict';

	var Backbone            = require( 'backbone' );
	var VideoCollectionView = require( 'videoPlayer/views/tabs/VideoCollectionView' );

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

			testCollection = new Backbone.Collection( testData );

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

			it( 'has a `tagName` property with value `div`', function ( ) {
				videosCollectionView.should.have.property( 'tagName' );
				videosCollectionView.tagName.should.be.equal( 'div' );
			} );

		} );

	} );

} );
