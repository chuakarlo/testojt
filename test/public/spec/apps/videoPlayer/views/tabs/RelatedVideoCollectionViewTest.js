define ( function ( require ) {
	'use strict';

	var sinon    = window.sinon;
	var $        = require( 'jquery' );

	var RelatedVideoCollectionView = require( 'videoPlayer/views/tabs/RelatedVideoCollectionView' );
	var RelatedVideoCollection     = require( 'videoPlayer/collections/RelatedVideoCollection' );

	describe( 'RelatedVideoCollectionView', function () {
		var relatedVideoCollectionView;
		var testData;
		var testCollection;

		before( function () {
			testData = [ {
				'url'         : '',
				'ContentName' : 'test1',
				'duration'    : '0:01:00'
			}, {
				'url'         : '',
				'ContentName' : 'test2',
				'duration'    : '0:02:00'
			}, {
				'url'         : '',
				'ContentName' : 'test3',
				'duration'    : '0:03:00'
			}, {
				'url'         : '',
				'ContentName' : 'test4',
				'duration'    : '0:04:00'
			} ];

			testCollection             = new RelatedVideoCollection( testData );
			relatedVideoCollectionView = new RelatedVideoCollectionView( {
				'collection' : testCollection
			} );
			relatedVideoCollectionView.render();
		} );

		after( function () {
			 relatedVideoCollectionView = null;
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

		describe( '.render', function () {
			var setCarouselSpy;
			var SpiedObject;

			before( function () {
				setCarouselSpy = sinon.spy();
				SpiedObject    = RelatedVideoCollectionView.extend( {
					'setCarousel' : setCarouselSpy
				} );

				relatedVideoCollectionView = new SpiedObject( {
					'collection': testCollection
				} );

				relatedVideoCollectionView.render();
			} );

			after( function () {
				setCarouselSpy.reset();
				relatedVideoCollectionView = null;
			} );

			it( 'will call .setCarousel', function() {
				setCarouselSpy.should.have.callCount( 1 );
			} );
		} );

		describe( '.setCarousel', function() {
			var carouselSlickSpy;

			before( function () {
				carouselSlickSpy           = sinon.spy( $.fn , 'slick' );
				relatedVideoCollectionView = new RelatedVideoCollectionView( {
					'collection': new RelatedVideoCollection( testData )
				} );
				relatedVideoCollectionView.setCarousel();
			} );

			after( function () {
				carouselSlickSpy.reset();
			} );

			it( 'will call .slick' , function () {
				carouselSlickSpy.callCount.should.be.at.least( 1 );
			} );
		} );

		describe( '.hoverNext', function() {
			var hoverSpy;
			var SpiedObject;

			before( function () {
				hoverSpy    = sinon.spy();
				SpiedObject = RelatedVideoCollectionView.extend( {
					'hover': hoverSpy
				} );

				relatedVideoCollectionView = new SpiedObject( {
					'collection': testCollection
				} );

				relatedVideoCollectionView.render();
				relatedVideoCollectionView.hoverNext( relatedVideoCollectionView.$el );
			} );

			after( function () {
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
					'collection': testCollection
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
			it( 'will set the timeoutId to null', function() {
				relatedVideoCollectionView.timeoutId = 123;
				relatedVideoCollectionView.clearTimeout();
				( relatedVideoCollectionView.timeoutId  === null ).should.equal( true );
			} );
		} );

	} );

} );
