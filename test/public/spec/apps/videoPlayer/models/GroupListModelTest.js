define( function ( require ) {
	'use strict';

	var GroupListModel = require( 'videoPlayer/models/GroupListModel' );
	var testData;
	var groupListModel;

	describe( 'GroupListModel', function () {

		before( function () {
			groupListModel = new GroupListModel();
			testData = {
				'id'       : 1,
				'name'     : 'PTA',
				'selected' : false
			};
		} );

		it( 'should be an instance of GroupListModel', function () {
			groupListModel.should.be.an.instanceof( GroupListModel );
		} );

		it( 'should be able to update a data', function () {
			groupListModel.set( {'selected' : true} );
			groupListModel.get('selected').should.equal( true );
		} );

		it( 'should have property of the updated data', function () {
			groupListModel.set( testData );
			groupListModel.id.should.equal( testData.id );
			groupListModel.get( 'name' ).should.equal( testData.name );
			groupListModel.get( 'selected' ).should.be.equal(false);
		} );

		describe( 'Attributes', function() {
			beforeEach( function() {
				groupListModel = new GroupListModel();
			} );

			it( 'should support checking the checkbox', function() {
				groupListModel.set( 'selected', true );
				groupListModel.get( 'selected' ).should.be.equal( true );
			} );
		} );
	} );
} );
