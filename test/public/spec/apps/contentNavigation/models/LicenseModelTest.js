define( function ( require ) {

	'use strict';

	var expect		= require( 'chai' ).expect;
	var Backbone	= require( 'backbone' );

	var LibraryModel = require( 'contentNavigation/models/Model' );
	var libraryModel = new LibraryModel();

	describe( 'Library Model', function () {

		it( 'should be an instance of a Backbone.Model object', function () {
			libraryModel.should.be.an.instanceof( Backbone.Model );
		} );

		it( 'should inherit LibraryModel attributes', function () {
			expect(
				JSON.stringify( libraryModel.defaults )
			)
			.to.deep.equal(
				JSON.stringify( new LibraryModel().defaults )
			);
		} );

		it( 'should possess the default properties LibraryModel object has', function () {
			libraryModel.attributes.should.include.keys(
				'id',
				'title'
			);
		} );

		it( 'should contain the default values for the default properties defined in the LibraryModel object', function () {
			libraryModel.attributes.id.should.be.equal( 'Library-1' );
			libraryModel.attributes.title.should.be.equal( 'Default Library' );
		} );

		it( 'should have "id" as idAttribute', function () {
			expect( libraryModel.idAttribute ).to.equal( 'id' );
		} );

	} );
} );