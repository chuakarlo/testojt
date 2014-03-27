define( function ( require ) {
	'use strict';

	var Model		= require( 'contentNavigation/models/SegmentModel' );
	var View		= require( 'contentNavigation/views/Segments/SegmentCollectionView' );
	var Collection	= require( 'contentNavigation/collections/SegmentCollection' );

	describe( 'Segment Collection View Test', function () {

		var segmentView;
		var	segmentsCollection;
		var segments;

		before( function () {
			segments = [
				new Model( {
					'ContentId'				: 10101,
					'ContentParentId'		: 101,
					'ContentName'			: 'Assessment for Learning (Segment 1)',
					'ContentDescription'	: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
					'ContentTypeId'			: 0,
					'PresentationOrder'		: 0,
					'SegmentLengthInSeconds': 1800,
					'SKU'					: '',
					'FileName'				: '',
					'ImageURL'				: 'http://builtbyhq.com/projects/respond/2/img/video-bg-2.png',
					'VideoURL'				: 'http://www.youtube.com/embed/9g8_-LoCdKI',
					'GuidebookFileName'		: '',
					'AudioFileName'			: '',
					'TranscriptFileName'	: '',
					'PreviewVideoName'		: '',
					'Created'				: 0,
					'Creator'				: 0,
					'Modified'				: 0,
					'Modifier'				: 0,
					'Removed'				: 0,
					'Remover'				: 0,
					'SearchData'			: '',
					'EditionName'			: '',
					'ProgramName'			: '',
					'Children'				: []
				} ),
				new Model( {
					'ContentId'				: 10102,
					'ContentParentId'		: 101,
					'ContentName'			: 'Assessment for Learning (Segment 2)',
					'ContentDescription'	: 'Description 2',
					'ContentTypeId'			: 0,
					'PresentationOrder'		: 0,
					'SegmentLengthInSeconds': 1020,
					'SKU'					: '',
					'FileName'				: '',
					'ImageURL'				: 'http://builtbyhq.com/projects/respond/2/img/video-bg-3.png',
					'VideoURL'				: 'http://www.youtube.com/embed/9g8_-LoCdKI',
					'GuidebookFileName'		: '',
					'AudioFileName'			: '',
					'TranscriptFileName'	: '',
					'PreviewVideoName'		: '',
					'Created'				: 0,
					'Creator'				: 0,
					'Modified'				: 0,
					'Modifier'				: 0,
					'Removed'				: 0,
					'Remover'				: 0,
					'SearchData'			: '',
					'EditionName'			: '',
					'ProgramName'			: '',
					'Children'				: []
				} )
			];

			segmentsCollection = new Collection( segments );
		} );

		after( function () {
			segmentsCollection = null;
		} );

		it( 'should be an instance of Segment Collection', function () {
			segmentsCollection.should.be.an.instanceof( Collection );
		} );

		it( 'should render UL for list of segments', function () {
			segmentView = new View();
			segmentView.el.nodeName.should.be.equal( 'UL' );
		} );

		it( 'should contain segments collection', function () {
			segmentView = new View( { collection : segmentsCollection } );
			segmentView.collection.at(0).attributes.should.include.keys( 'ContentName', 'ContentId', 'ContentDescription' );
			segmentView.collection.at(0).attributes.ContentDescription.should.contain( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' );
		} );

		it( 'should locate the test data', function () {
			segmentsCollection.url.should.be.equal('/api/contents');
		} );

	} );
} );