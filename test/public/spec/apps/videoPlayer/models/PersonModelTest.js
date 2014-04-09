define( function ( require ) {
	'use strict';

	var sinon     = require( 'sinon' );
	var chai      = require( 'chai' );
	var sinonChai = require( 'sinon-chai' );
	var expect    = chai.expect;

	chai.use( sinonChai );

	var PersonModel = require( 'videoPlayer/models/PersonModel' );

	describe( 'PersonModel', function () {

		var personModel;

		before( function () {
			personModel = new PersonModel( {
				'FirstName'    : 'John',
				'LastName'     : 'Doe',
				'DistrictName' : 'Salt Lake City',
				'State'        : 'UT'
			} );
		} );

		after( function () {
			personModel = undefined;
		} );

		it( 'does have an `idAttribute` property', function () {
			personModel.should.have.property( 'idAttribute' );
			personModel.idAttribute.should.eql( 'PersonnelId' );
		} );

		describe( '.initialize', function () {

			it( 'does set the `Name` model attribute', function () {
				personModel.get( 'Name' ).should.eql( 'John Doe' );
			} );

			it( 'does set the `Location` model attribute', function () {
				personModel.get( 'Location' ).should.eql( 'Salt Lake City, UT' );
			} );

		} );

	} );

} );
