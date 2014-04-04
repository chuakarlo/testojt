define( function ( require ) {
	'use strict';

	var VideoSegmentCollectionView = require( 'videoPlayer/views/tabs/VideoSegmentCollectionView' );
	var VideoSegmentCollection     = require( 'videoPlayer/collections/VideoSegmentCollection' );

	var videoSegmentCollectionView;
	var videoSegmentCollectionTheView;

	describe( 'VideoSegmentCollectionView', function () {

		before( function () {

			this.dummyData = new VideoSegmentCollection();

			this.dummyData.reset( [
			{
				'video'    : 'http://builtbyhq.com/projects/school/CORE/v1/img/vid-5.png',
				'title'    : 'Assessment For Learning',
				'duration' : '1 min'
			},
			{
				'video'    : 'http://builtbyhq.com/projects/school/CORE/v1/img/vid-6.png',
				'title'    : 'Differentiated Instruction...',
				'duration' : '2 min'
			},
			{
				'video'    : 'http://builtbyhq.com/projects/school/CORE/v1/img/vid-6.png',
				'title'    : 'Differentiated Instruction...',
				'duration' : '2 min'
			},
			{
				'video'    : 'http://builtbyhq.com/projects/school/CORE/v1/img/vid-6.png',
				'title'    : 'Differentiated Instruction...',
				'duration' : '2 min'
			} ] );

			videoSegmentCollectionView = new VideoSegmentCollectionView( {
				'collection' : this.dummyData
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

			it( 'should have a `className` property with value `vid-tab`', function () {

				videoSegmentCollectionView.should.have.property( 'className' );
				videoSegmentCollectionView.className.should.be.equal( 'vid-tab' );

			} );

			it( 'should have a `tagName` property with value `ul`', function () {

				videoSegmentCollectionView.should.have.property( 'tagName' );
				videoSegmentCollectionView.tagName.should.be.equal( 'ul' );

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

					videoSegmentCollectionView.collection.should.equal( this.dummyData );

				} );

			} );

		} );

	} );

} );
