define( function ( require ) {
	'use strict';

	var GroupListCollection = require( 'videoPlayer/collections/GroupListCollection' );

	describe( 'GroupListCollection', function () {
		var groupList;
		var testData;

		before( function () {
			groupList = new GroupListCollection();
			testData  = [ {
				'id'   : 1,
				'name' : 'PTA',
			}, {
				'id'   : 2,
				'name' : 'Groups'
			} ];
			groupList.reset( testData );
		} );

		it( 'should be an instance of GroupListCollection', function () {
			groupList.should.be.an.instanceof( GroupListCollection );
		} );

		it( 'should have contain all the data', function () {
			groupList.length.should.equal( testData.length );

		} );

	} );
} );
