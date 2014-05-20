define ( function ( require ) {
	'use strict';

	var sinon      = window.sinon;
	var expect     = require( 'chai' ).expect;
	var App        = require( 'App' );
	var Backbone   = require( 'backbone' );
	var controller = require( 'apps/homepage/external/content/external/your-queue/controllers/baseController' );

	describe( 'Your Queue - baseController', function () {

		var models;

		before( function () {

			models = [ {
				'AudioFileName'          : '',
				'Children'               : Array[0],
				'ContentDescription'     : '<i>Segment 1 of 1 of this program.</i>',
				'ContentId'              : 7652,
				'ContentName'            : '6th Grade: RI.6.1 & 4 - Critical Reading in Elective Classes',
				'ContentTypeId'          : 6,
				'GuidebookFileName'      : '',
				'ImageURL'               : 'thumb_2182_CC_OR_6ELA_DDeLapp_CCC.jpg',
				'SegmentLengthInSeconds' : 192,
				'TranscriptFileName'     : '',
				'VideoTypeId'            : 1,
				'contentType'            : 'queue',
				'queued'                 : true
			}, {
				'AudioFileName'          : '',
				'Children'               : Array[0],
				'ContentDescription'     : '<i>Segment 1 of 1 of this program.</i>',
				'ContentId'              : 0,
				'ContentName'            : '6th Grade: RI.6.1 & 4 - Critical Reading in Elective Classes',
				'ContentTypeId'          : 6,
				'GuidebookFileName'      : '',
				'ImageURL'               : 'thumb_2182_CC_OR_6ELA_DDeLapp_CCC.jpg',
				'SegmentLengthInSeconds' : 192,
				'TranscriptFileName'     : '',
				'VideoTypeId'            : 1,
				'contentType'            : 'queue',
				'queued'                 : false
			} ];
		} );

		it( 'doSetHeader should return a template', function () {
			var sFirstName     = 'Rosana';
			var headerStub     = sinon.stub( App, 'request' ).returns( { 'FirstName' : sFirstName } );
			var templateHeader = controller.doSetHeader();

			expect( templateHeader ).to.be.a( 'string' ).and
															.to.contain( sFirstName );
			expect( headerStub.callCount ).to.have.length.equal( 1 );

			App.request.restore();
		} );

		it( 'doFetchLogic ' , function ( ) {
			var collection = new ( Backbone.Collection.extend() ) ( models );

			var collectionParam = controller.doFetchLogic( collection );
			collectionParam.should.have.property( 'collection' );
			collectionParam.should.have.property( 'count' );

		} );

	} );

} );
