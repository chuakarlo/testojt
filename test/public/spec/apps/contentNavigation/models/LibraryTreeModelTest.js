define( function ( require ) {

	'use strict';

	var expect		= require( 'chai' ).expect;
	var Backbone	= require( 'backbone' );

	var LibraryTreeModel = require( 'contentNavigation/models/LibraryTreeModel' );
	var libraryTreeModel = new LibraryTreeModel();

	describe( 'CN-LibraryTreeModel Test', function () {

		it( 'should be an instance of a Backbone.Model object', function () {
			libraryTreeModel.should.be.an.instanceof( Backbone.Model );
		} );

		it( 'should inherit LibraryTreeModel attributes', function () {
			expect(
				JSON.stringify( libraryTreeModel.defaults )
			)
			.to.deep.equal(
				JSON.stringify( new LibraryTreeModel().defaults )
			);
		} );

		it( 'should possess the default properties LibraryTreeModel object has', function () {
			libraryTreeModel.attributes.should.include.keys(
				'ContentId',
				'ContentName'
			);
		} );

		it( 'should contain the default values for the default properties defined in the LibraryTreeModel object', function () {
			libraryTreeModel.attributes.ContentId.should.be.equal( 'filter-1' );
			libraryTreeModel.attributes.ContentName.should.be.equal( 'Default Filter' );
		} );

		it( 'should have "ContentId" as idAttribute', function () {
			expect( libraryTreeModel.idAttribute ).to.equal( 'ContentId' );
		} );

		it( 'should have empty Children property', function () {
			libraryTreeModel.Children.length.should.be.equal( 0 );
		} );

	} );
} );