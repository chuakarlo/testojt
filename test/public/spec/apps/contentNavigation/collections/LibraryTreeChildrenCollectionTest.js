define( function ( require ) {

	'use strict';

	var expect                        = require( 'chai' ).expect;
	var Backbone                      = require( 'backbone' );
	var Collection                    = require( 'contentNavigation/collections/LibraryTreeChildrenCollection' );
	var libraryTreeChildrenCollection = new Collection();
	var Model                         = require( 'contentNavigation/models/LibraryTreeChildrenModel' );

	describe( 'CN-LibraryTreeChildrenCollection Test', function () {

		it( 'should be an instance of a Backbone.Collection object', function () {
			libraryTreeChildrenCollection.should.be.an.instanceof( Backbone.Collection );
		} );

		it( 'should have LibraryTreeChildrenModel as model', function () {
			libraryTreeChildrenCollection.model.should.be.equal( Model );
		} );

		it( 'should be an empty Backbone.Collection', function () {
			expect( libraryTreeChildrenCollection.length ).to.equal( 0 );
		} );


		describe( 'creating new collection using this instance', function () {

			var _testModels = [
				new Model( {
					'ContentId'   : 'filter-1',
		            'ContentName' : 'Filter1'
				} ),
				new Model( {
					'ContentId'   : 'filter-2',
		            'ContentName' : 'Filter2'
				} )
			];


			var _testCollection = new Collection( _testModels );

			it( 'should not be empty', function () {
				expect( _testCollection.length ).to.equal( 2 );
			} );

			it( 'should contain all the attributes of defined LibraryTreeChildrenModel when retrieved from the collection', function () {
				_testCollection.at( 0 ).attributes.should.include.keys( 'ContentId', 'ContentName' );
			} );

		} );

	} );

} );