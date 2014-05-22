define( function ( require ) {
	'use strict';

	var sinon                 = window.sinon;
	var Backbone              = require( 'backbone' );
	var Marionette            = require( 'marionette' );
	var BaseObject            = require( 'apps/homepage/BaseObject' );
	var base                  = require( 'apps/homepage/external/content/external/recommended/base' );
	var RecommendedCollection = require( 'apps/homepage/external/content/external/recommended/collections/RecommendedCollection' );
	var utils                 = require( 'apps/homepage/external/content/utils/contentItemCollectionUtil' );

	describe ( 'baseTest for Recommended', function () {
		var modelData;
		var queueData;
		var collection;
		var utilStub;

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
			utilStub   = sinon.stub( utils, 'collectionFetch' );

		} );

		after( function () {

			utilStub.restore();
		} );

		it( 'should be an instance of `BaseObject`', function () {
			base.should.be.an.instanceof( BaseObject );
		} );

		it( 'should have an `id` property equal to `recommended`', function () {
			base._id.should.be.equal( 'recommended' );
		} );

		it( 'should have a `header` property', function () {
			base.should.have.property( '_header' );
		} );

		it( 'should have `.getCollection` property equal to RecommendedCollection', function () {
			base._items.should.be.equal( RecommendedCollection );
		} );

		it( 'should have `getPreFetchLogic` property ', function () {
			base.should.have.property( 'getFetchLogic' );
			var options     = { };
			var callbackSpy = sinon.spy();

			base.getPreFetchLogic( options, callbackSpy );
			callbackSpy.callCount.should.be.above( 0 );

		} );

		it( '`getFetchLogic` should return an object with property collection and count', function () {
			var fetch = base.getFetchLogic( collection );

			fetch.should.be.an( 'object' ).and.to.have.keys( 'collection', 'count' );
			fetch.should.have.property( 'collection', collection );
			fetch.should.have.property( 'count', modelData[ 0 ].numFound );

		} );

		it( 'should have a getCarouselCustomAction property', function () {
			var view  = new Marionette.CollectionView.extend();
			var data  = { };
			view.collection        = new ( Backbone.Collection.extend() ) ();
			view.collection.length = 2;

			base.getCarouselCustomAction( view, data, 1 );
			utils.collectionFetch.callCount.should.be.above( 0 );

		} );

	} );

} );
