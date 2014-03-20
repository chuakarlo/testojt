define( function ( require ) {
	'use strict';

	var sinon          = window.sinon;
	var licensesModule = require( 'apps/user/controllers/licensesController' );
	var Remoting       = require( 'Remoting' );

	describe( 'Users Licenses Module', function () {

		var Licenses;
		var App;

		beforeEach( function () {
			Licenses = {};

			App = {
				'reqres' : {
					'setHandler' : function () {}
				}
			};
		} );

		it( 'should have correct methods', function () {
			licensesModule( Licenses, App );

			Licenses.getLicenses.should.be.a( 'function' );
			Licenses.clear.should.be.a( 'function' );
		} );

		it( 'should set handler for user licenses', function () {
			var spy = sinon.spy( App.reqres, 'setHandler' );

			licensesModule( Licenses, App );

			spy.should.have.callCount( 1 );
			spy.should.have.been.calledWith( 'user:licenses' );
		} );

		it( 'should fetch Licenses from Remoting if not already stored', function () {
			var spy = sinon.spy( Remoting, 'fetch' );

			licensesModule( Licenses, App );

			Licenses.getLicenses();

			spy.should.have.callCount( 1 );
			spy.should.have.been.calledWithMatch( {
				'method' : 'getUsersLicenses',
				'path'   : 'com.schoolimprovement.pd360.dao.SessionService'
			} );
		} );

	} );
	
} );
