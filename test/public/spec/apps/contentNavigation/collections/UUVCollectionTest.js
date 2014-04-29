define( function ( require ) {

	'use strict';

	var expect        = require( 'chai' ).expect;
	var Backbone      = require( 'backbone' );
	var Collection    = require( 'contentNavigation/collections/UUVCollection' );
	var UUVCollection = new Collection();
	var Model         = require( 'contentNavigation/models/UUVModel' );

	describe( 'CN-UUVCollection', function () {

		it( 'should be an instance of a Backbone.Collection object', function () {
			UUVCollection.should.be.an.instanceof( Backbone.Collection );
		} );

		it( 'should be an empty Backbone.Collection', function () {
			expect( UUVCollection.length ).to.equal( 0 );
		} );

		describe( 'creating new collection using this instance', function () {

			var _testModels = [ new Model( {
				'Created'        : 'April, 09 2013 07:22:07',
				'Creator'        : 586606,
				'Description'    : 'Test Description1',
				'Featured'       : 0,
				'FileName'       : '1729.mp4',
				'FirstName'      : 'Bruce ',
				'ImageURL'       : 'http://localhost:8080/img/pd-360.png',
				'LastName'       : 'Wathen',
				'Name'           : 'Test Name1',
				'Private'        : 0,
				'Removed'        : 'April, 09 2013 07:35:20',
				'Remover'        : 0,
				'Tags'           : [ ],
				'Topic'          : 'UUV Test Collection',
				'UUVideoId'      : 12345,
				'UUVideoTopicId' : 1234,
				'Uploaded'       : 1,
				'ViewCount'      : 2
			} )
			];


			var _testUUVCollection = new Collection( _testModels );

			it( 'should not be empty', function () {
				expect( _testUUVCollection.length ).to.equal( 1 );
			} );

			it( 'should contain all the attributes of defined LicenseModel when retrieved from the collection', function () {
				_testUUVCollection.at( 0 ).attributes.should.include.keys( 'UUVideoId', 'Name' );
			} );

		} );

	} );

} );