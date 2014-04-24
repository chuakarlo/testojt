// define( function ( require ) {

// 	'use strict';

// 	var expect		        = require( 'chai' ).expect;
// 	var Backbone	        = require( 'backbone' );

// 	var LibraryCollection	= require( 'contentNavigation/collections/LibraryCollection' );
// 	var libraryCollection	= new LibraryCollection();

// 	var LibraryModel		= require( 'contentNavigation/models/LibraryModel' );

// 	describe( 'Library Collection', function () {

// 		it( 'should be an instance of a Backbone.Collection object', function () {
// 			libraryCollection.should.be.an.instanceof( Backbone.Collection );
// 		} );

// 		it( 'should have LibraryModel as model', function () {

// 			var collectionModel = new libraryCollection.model();
// 			var libModel        = new LibraryModel();

// 			collectionModel.id.should.be.equal( libModel.id  );
// 		} );

// 		it( 'should have a url property', function () {
// 			expect( libraryCollection.url ).to.equal( undefined );
// 		} );

// 		it( 'should be an empty Backbone.Collection', function () {
// 			expect( libraryCollection.length ).to.equal( 0 );
// 		} );


// 		describe( 'creating new collection using this instance', function () {

// 			var _testFilters = [
// 				{ 'id' : 'PD360', 'title': 'PD360' , 'contentType' : 'PD360Content' },
// 				{ 'id' : 'SINETInternalTraining', 'title': 'SINET Internal Training' ,  'contentType' : 'CustomContent' },
// 				{ 'id' : 'GZDemo', 'title': 'GZ Demo' , 'contentType' : 'CustomContent' },
// 				{ 'id' : 'UUV', 'title': 'User Uploaded Videos' , 'contentType' : 'UserUploadedContent' }
// 			];


// 			var _testLibraryCollection = new LibraryCollection( _testFilters );

// 			it( 'should not be empty', function () {
// 				expect( _testLibraryCollection.length ).to.equal( 4 );
// 			} );

// 			it( 'should contain all the attributes of defined LibraryModel when retrieved from the collection', function () {
// 				_testLibraryCollection.at( 0 ).attributes.should.include.keys( 'id', 'title' );
// 			} );

// 		} );

// 	} );

// } );