define ( function ( require ) {
	'use strict';

	var sinon    = window.sinon;
	var $        = require( 'jquery' );
	var Remoting = require( 'Remoting' );

	var RelatedVideoCollectionView = require( 'videoPlayer/views/tabs/RelatedVideoCollectionView' );


	describe( 'RelatedVideoCollectionView', function () {
		var relatedVideoCollectionView;

		before( function () {
			sinon.stub( Remoting , 'fetch').returns( $.Deferred() );
			relatedVideoCollectionView = new RelatedVideoCollectionView( {
				'ContentId' : 1
			} );
			this.theView = relatedVideoCollectionView.render();
		} );


		after( function () {
			Remoting.fetch.restore();
		} );

		describe( '#relatedVideoCollectionView', function () {
			it( 'is an instance', function () {
				relatedVideoCollectionView.should.be.an.instanceof( RelatedVideoCollectionView );
			} );

			it( 'has `itemView` property', function () {
				relatedVideoCollectionView.should.have.property( 'itemView' );
			} );

			it( 'has a `className` property with value `vid-tab`', function () {
				relatedVideoCollectionView.should.have.property( 'className' );
				relatedVideoCollectionView.className.should.be.equal( 'vid-tab' );
			} );

			it( 'has a `tagName` property with value `ul`', function () {
				relatedVideoCollectionView.should.have.property( 'tagName' );
				relatedVideoCollectionView.tagName.should.be.equal( 'ul' );
			} );
		} );

		describe( '.fetchVideos', function () {
			var setCarouselSpy;
			var SpiedObject;

			before( function () {
				setCarouselSpy = sinon.spy();
				SpiedObject    = RelatedVideoCollectionView.extend( {
					'setCarousel' : setCarouselSpy
				} );

				relatedVideoCollectionView = new SpiedObject( {
					'ContentId' : 1234
				} );

				 sinon.stub( relatedVideoCollectionView.collection, 'fetchRelatedVid', function () {
					this.trigger( 'custom:sync' );
				} );

				relatedVideoCollectionView.render();
				relatedVideoCollectionView.fetchVideos();
			} );

			after( function () {
				relatedVideoCollectionView.collection.fetchRelatedVid.restore();
				setCarouselSpy.reset();
			} );

			it( 'will call .setCarousel', function() {
				setCarouselSpy.callCount.should.be.at.least( 1 );
			} );
		} );

		describe( '.setCarousel', function() {
			var carouselSnapSpy;

			before( function () {
				carouselSnapSpy = sinon.spy( $.fn , 'carouselSnap' );
				relatedVideoCollectionView = new RelatedVideoCollectionView( {
					'ContentId' : 1234
				} );
				sinon.stub( relatedVideoCollectionView , 'fetchVideos' );
				relatedVideoCollectionView.setCarousel();
			} );

			after( function () {
				carouselSnapSpy.reset();
				relatedVideoCollectionView.fetchVideos.restore();
			} );

			it( 'will call .carouselSnap' , function () {
				carouselSnapSpy.should.have.callCount( 1 );
			} );
		} );

		describe( '.onClose', function() {
			var testData;

			before( function () {
				testData  = [ {
					'url'         : '',
					'ContentName' : 'test',
					'duration'    : '0:01:00'
				}, {
					'url'         : '',
					'ContentName' : 'test',
					'duration'    : '0:02:00'
				}, {
					'url'         : '',
					'ContentName' : 'test',
					'duration'    : '0:03:00'
				}, {
					'url'         : '',
					'ContentName' : 'test',
					'duration'    : '0:04:00'
				} ];

				relatedVideoCollectionView = new RelatedVideoCollectionView( {
					'ContentId' : 1234
				} );

				sinon.stub( relatedVideoCollectionView , 'fetchVideos' );
				relatedVideoCollectionView.render();
				relatedVideoCollectionView.collection.reset( testData );
			} );

			after( function () {
				relatedVideoCollectionView.fetchVideos.restore();
			} );

			it( 'will reset the collection' , function () {
				relatedVideoCollectionView.collection.length.should.equal( 4 );
				relatedVideoCollectionView.close();
				relatedVideoCollectionView.collection.length.should.equal( 0 );
			} );

		} );

	} );

} );
