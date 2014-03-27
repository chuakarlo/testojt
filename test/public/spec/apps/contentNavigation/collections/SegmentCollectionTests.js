define( function ( require ) {

	'use strict';

	var expect		        = require( 'chai' ).expect;
	var Backbone	        = require( 'backbone' );

	var SegmentsCollection	= require( 'contentNavigation/collections/SegmentCollection' );
	var segmentsCollection	= new SegmentsCollection();

	var SegmentModel		= require( 'contentNavigation/models/SegmentModel' );

	describe( 'Segments Collection', function () {

		var _testSegments = [ new SegmentModel( {
				'ContentId'				: 10101,
				'ContentParentId'		: 101,
				'ContentName'			: 'Assessment for Learning (Segment 1)',
				'ContentDescription'	: 'Lorem ipsum dolor sit amet',
				'ImageURL'				: 'http://builtbyhq.com/projects/respond/2/img/video-bg-2.png',
				'VideoURL'				: 'http://www.youtube.com/embed/9g8_-LoCdKI'
			} ), new SegmentModel( {
				'ContentId'				: 10102,
				'ContentParentId'		: 101,
				'ContentName'			: 'Assessment for Learning (Segment 2)',
				'ContentDescription'	: 'Lorem ipsum dolor sit amet',
				'ImageURL'				: 'http://builtbyhq.com/projects/respond/2/img/video-bg-3.png',
				'VideoURL'				: 'http://www.youtube.com/embed/9g8_-LoCdKI'
			} ), new SegmentModel( {
				'ContentId'				: 10103,
				'ContentParentId'		: 101,
				'ContentName'			: 'Assessment for Learning (Segment 3)',
				'ContentDescription'	: 'Lorem ipsum dolor sit amet3',
				'ImageURL'				: 'http://builtbyhq.com/projects/respond/2/img/video-bg-4.png',
				'VideoURL'				: 'http://www.youtube.com/embed/9g8_-LoCdKI'
			} )
		];

		var _testSegmentsCollections = new SegmentsCollection( _testSegments );

		it( 'should be an instance of a Backbone.Collection object', function () {
			segmentsCollection.should.be.an.instanceof( Backbone.Collection );
		} );

		it( 'should have SegmentModel as model', function () {
			segmentsCollection.model.should.be.equal( SegmentModel );
		} );

		it( 'should have a url property', function () {
			expect( segmentsCollection.url ).to.equal( '/api/contents' );
		} );

		it( 'should be an empty Backbone.Collection', function () {
			expect( segmentsCollection.length ).to.equal( 0 );
		} );
	

		it( 'should not be empty', function () {
			expect( _testSegmentsCollections.length ).to.equal( 3 );
		} );

		it( 'all models should contain all the attributes of defined SegmentModel when retrieved from the collection', function () {
			_testSegmentsCollections.each( function ( model ) {

				model.attributes.should.have.property( 'ContentId' );
				model.attributes.should.have.property( 'ContentParentId' );
				model.attributes.should.have.property( 'ContentName' );
				model.attributes.should.have.property( 'ContentDescription' );
				model.attributes.should.have.property( 'ImageURL' );
				model.attributes.should.have.property( 'VideoURL' );
			} );
		} );
	} );
} );