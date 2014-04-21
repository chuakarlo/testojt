define( function ( require ) {
	'use strict';

	var RelatedVideoCollection = require( 'videoPlayer/collections/RelatedVideoCollection' );


	describe( 'Related Videos Collection', function () {
		var contents;
		var testData;

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

			contents = new RelatedVideoCollection( testData );
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

	} );

} );