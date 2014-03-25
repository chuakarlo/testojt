define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Remoting   = require( 'Remoting' );
	var sinon      = window.sinon;
	var App        = require( 'App' );
	var $          = require( 'jquery' );

	require( 'user/User' );

	describe( 'User Module', function () {

		after( function () {
			App.module( 'User' ).stop();
		} );
		
		it( 'should create module `User`', function () {
			App.should.have.property( 'User' );
			App.User.should.be.an.instanceof( Marionette.Module );
		} );

		describe( 'Entities', function () {
			
			describe( 'Licenses', function () {
				
				var remotingStub;

				before( function () {
					remotingStub = sinon.stub( Remoting, 'fetch' ).returns( [ [] ] );
				} );

				after( function () {
					Remoting.fetch.restore();
					remotingStub = null;
				} );

				it( 'should have correct properties', function () {
					App.should.have.property( 'Entities' );
					App.Entities.should.have.property( 'License' );
					App.Entities.should.have.property( 'LicenseCollection' );
				} );

				it( 'should return a LicenseCollection when requesting `user:licenses`', function () {

					var fetching = App.request( 'user:licenses' );

					$.when( fetching ).done( function ( result ) {
						result.should.be.an.instanceof( App.Entities.LicenseCollection );
					} );

					remotingStub.should.have.callCount( 1 );
					remotingStub.should.have.been.calledWithMatch( {
						'method' : 'getUsersLicenses',
						'path'   : 'com.schoolimprovement.pd360.dao.SessionService'
					} );
				} );

			} );

		} );

	} );
	
} );
