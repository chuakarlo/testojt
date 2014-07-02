define( function ( require ) {
	'use strict';

	var Backbone              = require( 'backbone' );
	var base                  = require( 'apps/homepage/external/content3/external/recommended/base' );
	var RecommendedCollection = require( 'apps/homepage/external/content3/external/recommended/collections/RecommendedCollection' );

	describe ( 'baseTest for Recommended', function () {
		var modelData;
		var queueData;
		var collection;

		before( function () {

			modelData = [ {
				'maxScore' : 17.90165,
				'name'     : 'response',
				'numFound' : 6
			},
			{
				'AudioFileName'          : 'au_2040-CC-Vision6.mp3',
				'ContentDescription'     : '<i>Segment 6 of 9 of this program.</i> This segment provides educators with an in-depth look at the CCSSO Common Core website and provides tips for navigation.<br/>',
				'ContentId'              : 7642,
				'ContentName'            : 'Walk through the CCSSO Website',
				'ContentParentId'        : 0,
				'ContentTypeId'          : 6,
				'Created'                : 'August, 09 2011 21:11:10',
				'Creator'                : 0,
				'EditionName'            : '',
				'FileName'               : '2040-CC-Vision6.mp4',
				'GuidebookFileName'      : 'gb_2040-CC-Vision6.pdf',
				'ImageURL'               : 'thumb_2040-CC-Vision6.jpg',
				'Modified'               : 'March, 21 2014 12:36:10',
				'Modifier'               : 0,
				'PresentationOrder'      : 70,
				'Presenters'             : Array[ 0 ],
				'PreviewVideoName'       : 'pre_2040-CC-Vision6.mp4',
				'ProgramName'            : '',
				'Removed'                : '',
				'Remover'                : '',
				'SKU'                    : 2040,
				'SearchData'             : 'Common Core, Pre-K, K, 1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th, 11th, 12th, Walk through the CCSSO Website, CCSSO, NGA, Chief Council of State School Officers, National Governors Association',
				'SegmentLengthInSeconds' : 452
			},
			{
				'AudioFileName'          : 'au_2040-CC-Vision6.mp3',
				'ContentDescription'     : '<i>Segment 6 of 9 of this program.</i> This segment provides educators with an in-depth look at the CCSSO Common Core website and provides tips for navigation.<br/>',
				'ContentId'              : 4190,
				'ContentName'            : 'Walk through the CCSSO Website',
				'ContentParentId'        : 0,
				'ContentTypeId'          : 6,
				'Created'                : 'August, 09 2011 21:11:10',
				'Creator'                : 0,
				'EditionName'            : '',
				'FileName'               : '2040-CC-Vision6.mp4',
				'GuidebookFileName'      : 'gb_2040-CC-Vision6.pdf',
				'ImageURL'               : 'thumb_2040-CC-Vision6.jpg',
				'Modified'               : 'March, 21 2014 12:36:10',
				'Modifier'               : 0,
				'PresentationOrder'      : 70,
				'Presenters'             : Array[ 0 ],
				'PreviewVideoName'       : 'pre_2040-CC-Vision6.mp4',
				'ProgramName'            : '',
				'Removed'                : '',
				'Remover'                : '',
				'SKU'                    : 2040,
				'SearchData'             : 'Common Core, Pre-K, K, 1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th, 11th, 12th, Walk through the CCSSO Website, CCSSO, NGA, Chief Council of State School Officers, National Governors Association',
				'SegmentLengthInSeconds' : 452
			} ];

			queueData = [ {
				'AudioFileName'          : '',
				'Children'               : Array[ 0 ],
				'ContentDescription'     : '<i>Segment 1 of 1 of this program.</i> Learn how to create tasks in your PD 360 groups.<br/>',
				'ContentId'              : 7642,
				'ContentName'            : 'Creating a Group Task',
				'ContentTypeId'          : 3,
				'GuidebookFileName'      : '',
				'ImageURL'               : 'thumb_2205_PD_grouptask.jpg',
				'SegmentLengthInSeconds' : 240,
				'TranscriptFileName'     : ''
			} ];

			var Collection = Backbone.Collection.extend();
			collection = new Collection( modelData );

		} );

		after( function () {

		} );

		it( 'should be an instance of `BaseObject`', function () {
			base.should.be.an.instanceof( Object );
		} );

		it( 'should have an `id` property equal to `recommended`', function () {
			base.id.should.be.equal( 'recommended' );
		} );

		it( 'should have a `header` property', function () {
			base.should.have.property( 'header' );
		} );

		it( 'should have `.getCollection` property equal to RecommendedCollection', function () {
			base.collection.should.be.equal( RecommendedCollection );
		} );

	} );

} );
