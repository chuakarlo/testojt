define( function ( require ) {
	'use strict';

	var SelectedItemsCollection = require( 'videoPlayer/collections/SelectedItemsCollection' );

	describe( 'SelectedItemsCollection', function () {
		var emails;
		var testData;

		before( function () {
			testData = [ {
				'id'           : 1,
				'name'         : 'Teacher One',
				'emailAddress' : 't1@one.com'
			}, {
				'id'           : 2,
				'name'         : 'Teacher Two',
				'emailAddress' : 't2@one.com'
			}, {
				'id'           : 3,
				'name'         : 'Teacher Three',
				'emailAddress' : 't3@one.com'
			} ];

			emails = new SelectedItemsCollection();
			emails.reset( testData );
		} );

		it( 'should be an instance of SelectedItemsCollection', function () {
			emails.should.be.an.instanceof( SelectedItemsCollection );
		} );

		it( 'should have length equal to number of test data', function () {
			emails.length.should.equal( testData.length );
		} );
	} );
} );
