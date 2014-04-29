define( function ( require ) {

	'use strict';

	var expect		= require( 'chai' ).expect;
	var Backbone	= require( 'backbone' );

	var LibraryTreeChildrenModel = require( 'contentNavigation/models/LibraryTreeChildrenModel' );
	var libraryTreeChildrenModel = new LibraryTreeChildrenModel();

	describe( 'CN-LibraryTreeChildrenModel Test', function () {

		it( 'should be an instance of a Backbone.Model object', function () {
			libraryTreeChildrenModel.should.be.an.instanceof( Backbone.Model );
		} );

		it( 'should inherit LibraryTreeChildrenModel attributes', function () {
			expect(
				JSON.stringify( libraryTreeChildrenModel.defaults )
			)
			.to.deep.equal(
				JSON.stringify( new LibraryTreeChildrenModel().defaults )
			);
		} );

		it( 'should possess the default properties LibraryTreeChildrenModel object has', function () {
			libraryTreeChildrenModel.attributes.should.include.keys(
				'ContentId',
				'ContentName'
			);
		} );

		it( 'should contain the default values for the default properties defined in the LibraryTreeChildrenModel object', function () {
			libraryTreeChildrenModel.attributes.ContentId.should.be.equal( 'filter-1' );
			libraryTreeChildrenModel.attributes.ContentName.should.be.equal( 'Default Filter' );
		} );

		it( 'should have "ContentId" as idAttribute', function () {
			expect( libraryTreeChildrenModel.idAttribute ).to.equal( 'ContentId' );
		} );

	} );
} );