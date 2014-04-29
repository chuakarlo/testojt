define( function ( require ) {

	'use strict';

	var expect		= require( 'chai' ).expect;
	var Backbone	= require( 'backbone' );

	var LicenseModel = require( 'contentNavigation/models/LicenseModel' );
	var licenseModel = new LicenseModel();

	describe( 'CN-LicenseModel', function () {

		it( 'should be an instance of a Backbone.Model object', function () {
			licenseModel.should.be.an.instanceof( Backbone.Model );
		} );

		it( 'should inherit LicenseModel attributes', function () {
			expect(
				JSON.stringify( licenseModel.defaults )
			)
			.to.deep.equal(
				JSON.stringify( new LicenseModel().defaults )
			);
		} );

		it( 'should possess the default properties LicenseModel object has', function () {
			licenseModel.attributes.should.include.keys(
				'CanVerify',
				'CertificateFileName',
				'ContactEmailAddress',
				'ContactName',
				'ContactPhone',
				'Created',
				'Creator',
				'EmailDomain',
				'ExpireDate',
				'GroupLeaderLabel',
				'Hidden',
				'LicenseContentTypeId',
				'LicenseId',
				'LicenseKey',
				'LicenseName',
				'LicenseTypeId'
			);
		} );

		it( 'should contain the default values for the default properties defined in the LicenseModel object', function () {
			licenseModel.attributes.LicenseName.should.be.equal( 'Default License' );
		} );

		it( 'should have "id" as idAttribute', function () {
			expect( licenseModel.idAttribute ).to.equal( 'id' );
		} );

	} );
} );