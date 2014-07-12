define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var sinon    = window.sinon;
	var App      = require( 'App' );

	require( 'user/entities/License' );

	describe( 'User License Collection Test', function () {

		var stub;

		before( function () {
			stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
		} );

		it( 'should exist on App.Entities', function () {
			App.should.have.property( 'Entities' );
			App.Entities.should.have.property( 'LicenseCollection' );
		} );

		describe( 'when initialized', function () {

			var collection;

			before( function () {
				collection = new App.Entities.LicenseCollection();
			} );

			after( function () {
				collection = null;
			} );

			it( 'should be an instance of CFCollection', function () {
				collection.should.be.an.instanceof( Backbone.CFCollection );
			} );

			it( 'should not return an object for getReadOptions', function () {
				collection.should.have.property( 'getReadOptions' );
				collection.getReadOptions.should.be.a( 'function' );

				var options = collection.getReadOptions();
				var expect  = window.chai.expect;

				expect( options ).to.be.a( 'undefined' );
			} );

			it( 'should not return an object for getUpdateOptions', function () {
				collection.should.have.property( 'getUpdateOptions' );
				collection.getUpdateOptions.should.be.a( 'function' );

				var options = collection.getUpdateOptions();
				var expect  = window.chai.expect;

				expect( options ).to.be.a( 'undefined' );
			} );

			it( 'should not return an object for getDeleteOptions', function () {
				collection.should.have.property( 'getDeleteOptions' );
				collection.getDeleteOptions.should.be.a( 'function' );

				var options = collection.getDeleteOptions();
				var expect  = window.chai.expect;

				expect( options ).to.be.a( 'undefined' );
			} );

			it( 'should not have property path', function () {
				collection.should.not.have.property( 'path' );
			} );

		} );

		describe( 'when requesting `user:licenses`', function () {

			var arr = new App.Entities.LicenseCollection( [
				{ 'LicenseId' : 1, 'LicenseTypeId' : 100 },
				{ 'LicenseId' : 2, 'LicenseTypeId' : 100 }
			] );

			before( function () {
				App.Session.license = arr;
			} );

			after( function () {
				App.Session.license = undefined;
			} );

			it( 'should return App.Session.license', function () {
				var licenses = App.request( 'user:licenses' );
				licenses.should.equal( arr );
			} );

			it( 'should have method hasLicenseId', function () {
				arr.should.have.property( 'hasLicenseId' );
				arr.hasLicenseId( 1 ).should.equal( true );
				arr.hasLicenseId( 3 ).should.equal( false );
			} );

			it( 'should have method hasObservationLicense', function () {
				var obs = new App.Entities.LicenseCollection( [
					{ 'LicenseId' : 1, 'LicenseTypeId' : 100 },
					{ 'LicenseId' : 2, 'LicenseTypeId' : 800 }
				] );
				obs.should.have.property( 'hasObservationLicense' );
				obs.hasObservationLicense().should.equal( true );
				arr.hasObservationLicense().should.equal( false );
			} );

		} );

	} );

} );
