define( function ( require ) {
	'use strict';

	var sinon = window.sinon;

	var VideoSegmentCollectionView = require( 'videoPlayer/views/tabs/VideoSegmentCollectionView' );
	var VideoSegmentCollection     = require( 'videoPlayer/collections/VideoSegmentCollection' );

	describe( 'VideoSegmentCollectionView', function () {
		var videoSegmentCollectionView;
		var fakeData;

		before( function () {
			fakeData = new VideoSegmentCollection();

			fakeData.reset( [
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

			videoSegmentCollectionView = new VideoSegmentCollectionView( {
				'collection' : fakeData
			} );

			videoSegmentCollectionView.render();

		} );

		after( function () {

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

					videoSegmentCollectionView.collection.should.equal( fakeData );

				} );

			} );

		} );

		describe( '.hoverNext', function () {
			var fakeData;
			var collectionView;
			var SpiedCollectionView;

			var hoverSpy;

			before( function() {
				hoverSpy = sinon.spy();

				fakeData = new VideoSegmentCollection();

				fakeData.reset( [
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

				SpiedCollectionView = VideoSegmentCollectionView.extend( {
					'hover' : hoverSpy
				} );
				collectionView = new SpiedCollectionView( {
					'collection' : fakeData
				} );

				collectionView.render();

			} );

			after( function() {
				hoverSpy.reset();
			} );

			it( 'should call `.hover`', function() {
				collectionView.hoverNext( function() {} );
				hoverSpy.should.have.been.called;
			} );

			it( 'should call `.hover`', function() {
				collectionView.hoverPrev( function() {} );
				hoverSpy.should.have.been.called;
			} );

		} );

		describe( '`.clearTimeout`', function () {
			var collectionView;
			var fakeData;

			before( function() {
				fakeData = new VideoSegmentCollection();

				fakeData.reset( [
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

				collectionView = new VideoSegmentCollectionView( {
					'collection' : fakeData
				} );

				collectionView.render();

			} );

			after( function() {

			} );

			it( 'will set timeoutId to null', function() {
				collectionView.timeoutId = 123;
				collectionView.clearTimeout();
				( collectionView.timeoutId === null ).should.equal( true );
			} );

		} );

	} );

} );
