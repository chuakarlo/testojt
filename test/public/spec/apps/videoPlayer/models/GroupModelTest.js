define( function ( require ) {
	'use strict';

	var sinon     = require( 'sinon' );
	var chai      = require( 'chai' );
	var sinonChai = require( 'sinon-chai' );
	var expect    = chai.expect;

	chai.use( sinonChai );

	var PersonModel = require( 'videoPlayer/models/GroupModel' );

	describe( 'PersonModel', function () {

		var personModel;

		before( function () {
			personModel = new PersonModel( {
				'LicenseName'    : 'St John Peabody'
			} );
		} );

		after( function () {
			personModel = undefined;
		} );

		it( 'does have an `idAttribute` property', function () {
			personModel.should.have.property( 'idAttribute' );
			personModel.idAttribute.should.eql( 'LicenseId' );
		} );

		describe( '.initialize', function () {

			it( 'does set the `Name` model attribute', function () {
				personModel.get( 'Name' ).should.eql( 'St John Peabody' );
			} );

			it( 'does set the `Location` model attribute', function () {
				personModel.get( 'Location' ).should.eql( '' );
			} );

		} );

	} );

} );
