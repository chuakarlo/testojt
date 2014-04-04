// define( function ( require ) {
// 	'use strict';

// 	var Controller        = require( 'contentNavigation/controllers/SegmentsController' );
// 	var Collection        = require( 'contentNavigation/collections/SegmentCollection' );
// 	var Communicator      = require( 'contentNavigation/Communicator' );
// 	var vent              = new Communicator();

// 	vent.reqres.setHandler('segment:getSortValueByValue', function () {
// 		return '';
// 	});

// 	var App				= {
// 		Utils:	 require( 'contentNavigation/controllers/UtilitiesController' )
// 	};
// 	var segmentController = new Controller( {
// 		App : App,
// 		vent : vent
// 	} );
// 	var segmentCollection = new Collection();

// 	describe( 'SegmentsController', function() {
// 		it( 'should be an instance', function () {
// 			segmentController.should.be.an.instanceof( Controller );
// 		} );
// 		describe( 'getCollection', function () {
// 			it('should fetch collection', function () {
// 				segmentCollection.fetch().done( function() {
// 					segmentCollection.should.have.length.above( 0 );
// 				} );
// 			} );

// 			it( 'should include model keys', function () {
// 				segmentCollection.fetch().done( function() {
// 					segmentCollection.at( 0 ).attributes.should.include.keys(
// 						'ContentId',
// 						'ContentParentId',
// 						'ContentName',
// 						'ContentDescription',
// 						'ContentTypeId',
// 						'PresentationOrder',
// 						'SegmentLengthInSeconds',
// 						'SKU',
// 						'FileName',
// 						'ImageURL',
// 						'GuidebookFileName',
// 						'AudioFileName',
// 						'TranscriptFileName',
// 						'PreviewVideoName',
// 						'Created',
// 						'Creator',
// 						'Modified',
// 						'Modifier',
// 						'Removed',
// 						'Remover',
// 						'SearchData',
// 						'EditionName',
// 						'ProgramName',
// 						'Children'
// 					);
// 				} );
// 			} );
// 		} );

// 		describe( 'getView', function () {
// 			describe( 'should return a view', function () {
// 				var view = segmentController.getView();
// 				it( 'should have a collection', function () {
// 					view.collection.fetch().done( function() {
// 						view.collection.should.have.length.above( 0 );
// 					} );
// 				} );
// 				it( 'should have tagName', function () {
// 					view.el.tagName.should.be.equal( 'UL' );
// 				} );
// 			} );
// 		} );

// 		describe( 'segmentFilter', function () {

// 			describe( '_getFiltersParam', function () {
// 				var args1 = [ 'grade-6', 'grade-7', 'grade-8' ] ;
// 				segmentController._segmentFilter( args1 );
// 				var  filteredUrl =  segmentController._getFiltersParam( );
// 				it( 'should return url parameters ( with filtered data )', function () {
// 					filteredUrl.should.be.equal( args1.join(',') );
// 				} );

// 				var args2 = [];
// 				segmentController._segmentFilter(args2);
// 				var withoutFilteredUrl =  segmentController._getFiltersParam( );
// 				it( 'should return url parameters ( without filtered data )', function () {
// 					withoutFilteredUrl.should.be.equal('');
// 				} );
// 			} );

// 		} );
// 	} );
// } );
