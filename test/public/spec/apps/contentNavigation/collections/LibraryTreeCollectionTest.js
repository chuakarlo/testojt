define( function ( require ) {

	'use strict';

	var expect                = require( 'chai' ).expect;
	var Backbone              = require( 'backbone' );
	var Collection            = require( 'contentNavigation/collections/LibraryTreeCollection' );
	var libraryTreeCollection = new Collection();
	var Model                 = require( 'contentNavigation/models/LibraryTreeModel' );

	describe( 'CN-LibraryTreeCollection Test', function () {

		it( 'should be an instance of a Backbone.Collection object', function () {
			libraryTreeCollection.should.be.an.instanceof( Backbone.Collection );
		} );

		it( 'should have FilterModel as model', function () {
			libraryTreeCollection.model.should.be.equal( Model );
		} );

		it( 'should be an empty Backbone.Collection', function () {
			expect( libraryTreeCollection.length ).to.equal( 0 );
		} );


		describe( 'creating new collection using this instance', function () {

			var _testModels = [
				new Model( {
					'ContentId'   : 'filter-1',
					'ContentName' : 'Filter1',
					'Children'    : [ ]
				} ),
				new Model( {
					'ContentId'   : 'filter-2',
					'ContentName' : 'Filter2',
					'Children'    : [ ]
				} )
			];


			var _testCollection = new Collection( _testModels );

			it( 'should not be empty', function () {
				expect( _testCollection.length ).to.equal( 2 );
			} );

			it( 'should contain all the attributes of defined LibraryTreeModel when retrieved from the collection', function () {
				_testCollection.at( 0 ).attributes.should.include.keys( 'ContentId', 'ContentName' );
			} );

			it( 'should contain Children and must be empty', function () {
				_testCollection.at( 0 ).Children.length.should.be.equal( 0 );
			} );

		} );

	} );

} );