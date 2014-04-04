define( function ( require ) {
	'use strict';

	var Remoting = require( 'Remoting' );
	var sinon    = window.sinon;
	var $        = require( 'jquery' );

	var RelatedVideoCollection = require( 'videoPlayer/collections/RelatedVideoCollection' );


	describe( 'Related Videos Collection', function () {
		var contents;
		var testData;

		before( function () {
			testData = [ {
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

			contents = new RelatedVideoCollection();
			contents.reset( testData );
		} );

		describe( '#contents', function () {
			it( 'is an instance', function () {
				contents.should.be.an.instanceof( RelatedVideoCollection );
			} );
		} );

		describe( '.reset', function () {
			it( 'will store test data in the collection', function () {
				contents.length.should.equal( testData.length );
			} );
		} );

		describe( '.fetchRelatedVid', function () {

			var successSpy;
			var errorSpy;
			var resetCollectionSpy;
			var SpiedObj;

			before( function () {
				successSpy         = sinon.spy();
				errorSpy           = sinon.spy();
				resetCollectionSpy = sinon.spy();
				sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );
				SpiedObj           = RelatedVideoCollection.extend( {
					'resetRelatedVideoCollection' : resetCollectionSpy
				} );
				contents           = new SpiedObj();
			} );

			after( function () {
				Remoting.fetch.restore();
				successSpy.reset();
				errorSpy.reset();
			} );

			it( 'has fetch data', function() {
				Remoting.fetch.callCount.should.equal( 0 );
				contents.fetchRelatedVid( {
						'args': {
							'ContentId': 1567
						}
				} , {
					'success' : successSpy,
					'error'   : errorSpy
				} ).resolve();
				Remoting.fetch.callCount.should.equal( 1 );
				successSpy.callCount.should.equal( 1 );
				errorSpy.callCount.should.equal( 0 );
			} );

			it( 'calls .resetRelatedVideoCollection' , function () {
				contents.fetchRelatedVid( {}, {
					'reset': true
				} );
				resetCollectionSpy.callCount.should.equal( 1 );
			} );

		} );

		describe( '.resetRelatedVideoCollection', function () {
			var fakeData;

			before( function () {
				contents = new RelatedVideoCollection();
				contents.reset();
				fakeData = [
					[ {
						'numFound'               : 2
					}, {
						'ImageURL'               : '',
						'ContentName'            : 'Sample Video 1',
						'SegmentLengthInSeconds' : 326
					}, {
						'ImageURL'               : '',
						'ContentName'            : 'Sample Video 2',
						'SegmentLengthInSeconds' : 120
					} ]
				];
				contents.resetRelatedVideoCollection( fakeData );
			} );

			it( 'should store the relatedVideos in the collection', function () {
				contents.length.should.equal( 2 );
			} );

		} );

	} );

} );
