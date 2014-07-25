define( function ( require ) {
	'use strict';

	var Backbone          = require( 'backbone' );
	var VideoCarouselView = require( 'common/views/VideoCarouselView' );

	describe( '[Common/Views] VideoCollectionView', function ( ) {

		var videoCarouselView;
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

			videoCarouselView = new VideoCarouselView( {
				'collection' : testCollection
			} );

		} );

		after( function () {
			videoCarouselView.remove();
			videoCarouselView = undefined;
		} );

		describe( '#videoCarouselView', function ( ) {

			it( 'is an instance', function ( ) {
				videoCarouselView.should.be.an.instanceof( VideoCarouselView );
			} );

			it( 'has `itemView` property', function ( ) {
				videoCarouselView.should.have.property( 'itemView' );
			} );

			it( 'has a `tagName` property with value `div`', function ( ) {
				videoCarouselView.should.have.property( 'tagName' );
				videoCarouselView.tagName.should.be.equal( 'div' );
			} );

		} );

	} );

} );
