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

			it( 'has a `className` property with value `slick`', function () {
				relatedVideoCollectionView.should.have.property( 'className' );
				relatedVideoCollectionView.className.should.be.equal( 'slick' );
			} );

			it( 'has a `tagName` property with value `div`', function () {
				relatedVideoCollectionView.should.have.property( 'tagName' );
				relatedVideoCollectionView.tagName.should.be.equal( 'div' );
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
			var carouselSlickSpy;

			before( function () {
				carouselSlickSpy = sinon.spy( $.fn , 'slick' );
				relatedVideoCollectionView = new RelatedVideoCollectionView( {
					'ContentId' : 1234
				} );
				sinon.stub( relatedVideoCollectionView , 'fetchVideos' );
				relatedVideoCollectionView.setCarousel();
			} );

			after( function () {
				carouselSlickSpy.reset();
				relatedVideoCollectionView.fetchVideos.restore();
			} );

			it( 'will call .slick' , function () {
				carouselSlickSpy.should.have.callCount( 1 );
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

		describe( '.hoverNext', function() {
			var hoverSpy;
			var SpiedObject;

			before( function() {
				hoverSpy    = sinon.spy();
				SpiedObject = RelatedVideoCollectionView.extend( {
					'hover': hoverSpy
				} );

				relatedVideoCollectionView = new SpiedObject( {
					'ContentId': 1234
				} );

				relatedVideoCollectionView.render();
				relatedVideoCollectionView.hoverNext( relatedVideoCollectionView.$el );
			} );

			after( function() {
				hoverSpy.reset();
			} );

			it( 'will call .hover', function() {
				hoverSpy.callCount.should.be.at.least( 1 );
			} );

		} );

		describe( '.hoverPrev', function() {
			var hoverSpy;
			var SpiedObject;

			before( function() {
				hoverSpy    = sinon.spy();
				SpiedObject = RelatedVideoCollectionView.extend( {
					'hover': hoverSpy
				} );

				relatedVideoCollectionView = new SpiedObject( {
					'ContentId': 1234
				} );

				relatedVideoCollectionView.render();
				relatedVideoCollectionView.hoverPrev( relatedVideoCollectionView.$el );
			} );

			after( function() {
				hoverSpy.reset();
			} );

			it( 'will call .hover', function() {
				hoverSpy.callCount.should.be.at.least( 1 );
			} );
		} );

		describe( '.clearTimeout', function() {
			before( function() {
				relatedVideoCollectionView = new RelatedVideoCollectionView( {
					'ContentId': 1234
				} );
				sinon.stub( relatedVideoCollectionView, 'fetchVideos' );
				relatedVideoCollectionView.render();
			} );

			after( function() {
				relatedVideoCollectionView.fetchVideos.restore();
			} );

			it( 'will set the timeoutId to null', function() {
				relatedVideoCollectionView.timeoutId = 123;
				relatedVideoCollectionView.clearTimeout();
				( relatedVideoCollectionView.timeoutId  === null ).should.equal( true );
			} );
		} );

	} );

} );
