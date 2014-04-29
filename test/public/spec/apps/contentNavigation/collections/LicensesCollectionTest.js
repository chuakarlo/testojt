define( function ( require ) {

	'use strict';

	var expect		        = require( 'chai' ).expect;
	var Backbone	        = require( 'backbone' );

	var LicensesCollection	= require( 'contentNavigation/collections/LicensesCollection' );
	var licensesCollection	= new LicensesCollection();

	var LicenseModel		= require( 'contentNavigation/models/LicenseModel' );

	describe( 'CN-LicensesCollection', function () {

		it( 'should be an instance of a Backbone.Collection object', function () {
			licensesCollection.should.be.an.instanceof( Backbone.Collection );
		} );

		it( 'should have LicenseModel as model', function () {

			var collectionModel = new licensesCollection.model();
			var licenseModel    = new LicenseModel();
			collectionModel.attributes.LicenseId.should.be.equal( licenseModel.attributes.LicenseId );
		} );

		it( 'should have a url property', function () {
			expect( licensesCollection.url ).to.equal( undefined );
		} );

		it( 'should be an empty Backbone.Collection', function () {
			expect( licensesCollection.length ).to.equal( 0 );
		} );


		describe( 'creating new collection using this instance', function () {

			var _testLicenses = [
				{ 'id' : 'PD360', 'title': 'PD360' , 'contentType' : 'PD360Content' },
				{ 'id' : 'SINETInternalTraining', 'title': 'SINET Internal Training' ,  'contentType' : 'CustomContent' },
				{ 'id' : 'GZDemo', 'title': 'GZ Demo' , 'contentType' : 'CustomContent' },
				{ 'id' : 'UUV', 'title': 'User Uploaded Videos' , 'contentType' : 'UserUploadedContent' }
			];


			var _testLicensesCollection = new LicensesCollection( _testLicenses );

			it( 'should not be empty', function () {
				expect( _testLicensesCollection.length ).to.equal( 4 );
			} );

			it( 'should contain all the attributes of defined LicenseModel when retrieved from the collection', function () {
				_testLicensesCollection.at( 0 ).attributes.should.include.keys( 'LicenseId', 'LicenseName' );
			} );

		} );

	} );

} );