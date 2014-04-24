define( function ( require ) {

	'use strict';

	var expect		= require( 'chai' ).expect;
	var Backbone	= require( 'backbone' );

	var FilterModel = require( 'contentNavigation/models/FilterModel' );
	var filterModel = new FilterModel();

	describe( 'Filter Model', function () {

		it( 'should be an instance of a Backbone.Model object', function () {
			filterModel.should.be.an.instanceof( Backbone.Model );
		} );

		it( 'should inherit FilterModel attributes', function () {
			expect(
				JSON.stringify( filterModel.defaults )
			)
			.to.deep.equal(
				JSON.stringify( new FilterModel().defaults )
			);
		} );

		it( 'should possess the default properties FilterModel object has', function () {
			filterModel.attributes.should.include.keys(
				'id',
				'title'
			);
		} );

		it( 'should contain the default values for the default properties defined in the FilterModel object', function () {
			filterModel.attributes.id.should.be.equal( 'filter-1' );
			filterModel.attributes.title.should.be.equal( 'Default Filter' );
		} );

		it( 'should have "id" as idAttribute', function () {
			expect( filterModel.idAttribute ).to.equal( 'id' );
		} );

	} );
} );