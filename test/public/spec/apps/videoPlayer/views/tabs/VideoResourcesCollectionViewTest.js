define( function ( require ) {
	'use strict';

	var sinon = window.sinon;

	var VideoResourcesCollectionView = require( 'videoPlayer/views/tabs/VideoResourcesCollectionView' );
	var VideoResourcesCollection     = require( 'videoPlayer/collections/VideoResourcesCollection' );

	describe( 'VideoResourceCollectionView', function () {
		var collectionView;
		var resourcesCollection;

		before( function () {
			resourcesCollection = new VideoResourcesCollection();

			sinon.stub( resourcesCollection, 'fetch', function () {
				resourcesCollection.reset( [ {
					'previewPath'  : '',
					'downloadPath' : '',
					'thumbnail'    : ''
				} ] );
			} );

			collectionView = new VideoResourcesCollectionView( {
				'collection': resourcesCollection
			} );

			collectionView.render();
		} );

		after( function () {
			resourcesCollection.fetch.restore();
		} );

		describe( 'Instantiation', function () {

			it( 'should have an `itemView` property', function () {
				collectionView.should.have.property( 'itemView' );
			} );

			it( 'should have a `className` property with value `slick`', function () {
				collectionView.should.have.property( 'className' );
				collectionView.className.should.be.equal( 'slick' );
			} );

			it( 'should have a `tagName` property with value `div`', function () {
				collectionView.should.have.property( 'tagName' );
				collectionView.tagName.should.be.equal( 'div' );
			} );

			describe( 'When data are stored in the collection', function () {
				/**
				 * Verify that the collection is an object
				 */
				it( 'should be an object', function () {
					collectionView.collection.should.be.an( 'object' );
				} );

				/**
				 * Verify that the collection has 3 values
				 */
				it( 'should have a length equal to testData', function () {
					collectionView.collection.length.should.be.equal( 1 );
				} );

			} );
		} );
	} );
} );
