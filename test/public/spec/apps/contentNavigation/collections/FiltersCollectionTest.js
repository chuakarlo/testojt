define( function ( require ) {

	'use strict';

	var expect		        = require( 'chai' ).expect;
	var Backbone	        = require( 'backbone' );

	var FiltersCollection	= require( 'contentNavigation/collections/FilterCollection' );
	var filtersCollection	= new FiltersCollection();

	var FilterModel			= require( 'contentNavigation/models/FilterModel' );

	describe( 'Filters Collection', function () {

		it( 'should be an instance of a Backbone.Collection object', function () {
			filtersCollection.should.be.an.instanceof( Backbone.Collection );
		} );

		it( 'should have FilterModel as model', function () {
			filtersCollection.model.should.be.equal( FilterModel );
		} );

		it( 'should have a url property', function () {
			expect( filtersCollection.url ).to.equal( '/' );
		} );

		it( 'should be an empty Backbone.Collection', function () {
			expect( filtersCollection.length ).to.equal( 0 );
		} );


		describe( 'creating new collection using this instance', function () {

			var _testFilters = [
				new FilterModel( {
					'id' : 'grade-1st',
					'title' : '1st'
				} ),
				new FilterModel( {
					'id' : 'grade-2nd',
					'title' : '2nd'
				} )
			];


			var _testFiltersCollection = new FiltersCollection( _testFilters );

			it( 'should not be empty', function () {
				expect( _testFiltersCollection.length ).to.equal( 2 );
			} );

			it( 'should contain all the attributes of defined FilterModel when retrieved from the collection', function () {
				_testFiltersCollection.at( 0 ).attributes.should.include.keys( 'id', 'title' );
			} );

		} );

	} );

} );