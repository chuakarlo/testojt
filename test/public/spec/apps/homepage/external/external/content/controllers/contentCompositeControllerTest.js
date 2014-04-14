define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	var ContentCompositeView  = require( 'apps/homepage/external/content/views/ContentCompositeView' );
	var RecommendedCollection = require( 'apps/homepage/external/content/external/recommended/collections/RecommendedCollection' );
	var recommendedBaseObj    = require( 'apps/homepage/external/content/external/recommended/base' );
	var controller            = require( 'apps/homepage/external/content/controllers/contentCompositeController' );

	describe( 'contentCompositeController', function () {
		var dummyData;
		var recommendedCollection;
		var contentCompositeView;

		before ( function () {
			dummyData = [ {
				'Modified'               : 'February, 06 2012 11:13:03',
				'ContentId'              : 4163,
				'Remover'                : '',
				'ImageURL'               : 'thumb_2038-CC-KY1-1.jpg',
				'ContentTypeId'          : 6,
				'Creator'                : 0,
				'Removed'                : '',
				'ProgramName'            : '',
				'AudioFileName'          : 'au_2038-CC-KY1-1.mp3',
				'ContentDescription'     : '<i>Segment 1 of 11 of this program.</i> The Common Core Standards are at the center of Kentucky\'s reform agenda.<br/>\r-Kentucky is the first state in the nation to officially adopt Common Core Standards.<br/>\r-Common Core is what is needed to prepare today\'s students for college and career readiness.<br/>\r-Kentucky\'s Senate Bill 1 requires new standards, new assessments, and a new accountability system to be in place for the 2011-2012 school year. (2:20)<br/>\r-Teachers are engaged in the development process of the Common Core Standards. (3:40)<br/>\r-Educators have been trained to apply the Common Core Standards. (4:20)<br/>\r-Common Core is the right thing to do for the children. (5:17)<br/>\r\r',
				'SearchData'             : 'New, Common Core, State Collaboration and Alignment, Kentucky Case Study, All Eyes on Kentucky, Common Core Standards, Content Leadership Network, Content specialists, standards',
				'Tags'                   : ['teacher', 'Middle School', 'Secondary', 'elementary', 'District Administrator', 'School Administrator', 'other'],
				'ContentName'            : 'All Eyes On Kentucky',
				'SegmentLengthInSeconds' : 469,
				'TranscriptFileName'     : 'tr_2038-CC-KY1-1.pdf',
				'Modifier'               : 0,
				'Presenters'             : [],
				'Topics'                 : [],
				'EditionName'            : '',
				'SKU'                    : 2038,
				'FileName'               : '2038-CC-KY1-1.mp4',
				'Created'                : 'August, 05 2011 12:57:21',
				'ContentParentId'        : 0,
				'GuidebookFileName'      : 'gb_2038-CC-KY1-1.pdf',
				'PreviewVideoName'       : 'pre_2038-CC-KY1-1.mp4',
				'PresentationOrder'      : 10
			} ];
		} );

		it( 'should return a header on `doTemplateHelpers`', function () {
			recommendedCollection = new RecommendedCollection();
			recommendedCollection.reset( recommendedBaseObj );
			contentCompositeView = new ContentCompositeView( { 'collection' : recommendedCollection } );

			var doTemplateHelpers = controller.doTemplateHelpers( contentCompositeView );
			doTemplateHelpers.should.be.equal( recommendedBaseObj._header() );
		} );
	} );

} );