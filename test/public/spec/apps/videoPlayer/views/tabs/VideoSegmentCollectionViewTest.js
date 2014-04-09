define( function ( require ) {
	'use strict';

	var sinon = window.sinon;
	var Backbone = require( 'backbone' );

	var VideoSegmentCollectionView = require( 'videoPlayer/views/tabs/VideoSegmentCollectionView' );
	var VideoSegmentCollection     = require( 'videoPlayer/collections/VideoSegmentCollection' );

	describe( 'VideoSegmentCollectionView', function () {
		var videoSegmentCollectionView;
		var videoSegmentCollectionTheView;
		var ResourcesModel;
		var resourcesModel;
		var dummyData;

		before( function () {

			dummyData = new VideoSegmentCollection();

			sinon.stub( dummyData, 'fetch', function () {
				dummyData.reset( [
					{
						'url'         : '',
						'ContentName' : '',
						'duration'    : ''
					},{
						'url'         : '',
						'ContentName' : '',
						'duration'    : ''
					},{
						'url'         : '',
						'ContentName' : '',
						'duration'    : ''
					},{
						'url'         : '',
						'ContentName' : '',
						'duration'    : ''
					}
				] );
			} );

			ResourcesModel = Backbone.Collection.extend( {} );

			resourcesModel = new ResourcesModel();
			resourcesModel.reset( [
				{
					'ContentId' : '613'
				}
			] );

			videoSegmentCollectionView = new VideoSegmentCollectionView( {
				'Content' : resourcesModel,
				'collection' : dummyData
			} );

			videoSegmentCollectionTheView = videoSegmentCollectionView.render();

		} );

		after( function () {

			this.view = null;

		} );

		describe( 'Instantiation', function () {

			it( 'should should be an instance of `VideoSegmentCollectionView`', function () {

				videoSegmentCollectionView.should.be.an.instanceof( VideoSegmentCollectionView );

			} );

			it( 'should have an `itemView` property', function () {

				videoSegmentCollectionView.should.have.property( 'itemView' );

			} );

			it( 'should have a `className` property with value `slick`', function () {

				videoSegmentCollectionView.should.have.property( 'className' );
				videoSegmentCollectionView.className.should.be.equal( 'slick' );

			} );

			it( 'should have a `tagName` property with value `div`', function () {

				videoSegmentCollectionView.should.have.property( 'tagName' );
				videoSegmentCollectionView.tagName.should.be.equal( 'div' );

			} );

			describe( 'VideoSegmentCollectionView that are stored in the collection', function () {
				/**
				 * Verify that the collection is an object
				 */
				it( 'should be an object', function () {
					videoSegmentCollectionView.collection.should.be.an( 'object' );
				} );

				/**
				 * Verify that the collection has 4 values
				 */
				it( 'should have a length of 4', function () {

					videoSegmentCollectionView.collection.length.should.be.equal( 4 );

				} );

				/**
				 * Verify that the collection is equal to the value set.
				 */
				it( 'should be equal to the data being passed', function () {

					videoSegmentCollectionView.collection.should.equal( dummyData );

				} );

			} );

		} );

	} );

} );
