define( function ( require ) {
	'use strict';

	var Remoting = require( 'Remoting' );
	var sinon    = window.sinon;
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	describe( 'Remoting Test', function () {
		
		it( 'should have method `fetch`', function () {
			Remoting.fetch.should.be.a( 'function' );
		} );

		describe( 'fetch', function ( done ) {

			var stub;

			before( function () {
				stub = sinon.stub().returns( false );
				App.PD360 = {};
				App.PD360.available = stub;
			} );

			after( function () {
				App.PD360 = null;
				stub      = null;
			} );

			afterEach( function () {
				$.ajax.restore();
			} );

			it( 'should not call ajax when passing no data', function ( done ) {
				var spy      = sinon.stub( $, 'ajax' );
				var fetching = Remoting.fetch();
				var state    = fetching.state();
				state.should.equal( 'rejected' );

				$.when( fetching ).fail( function ( error ) {
					spy.should.have.callCount( 0 );
					error.should.equal( 'No requests to process' );
					done();
				} );
			} );

			it( 'should not call ajax when passing data without `method`', function ( done ) {

				var spy      = sinon.stub( $, 'ajax' );
				var fetching = Remoting.fetch({});

				var state = fetching.state();
				state.should.equal( 'rejected' );

				$.when( fetching ).fail( function ( error ) {
					error.should.equal( 'Missing parameter: method' );
					spy.should.have.callCount( 0 );
					done();
				});
			} );

			it( 'should not call ajax when passing data without `args`', function ( done ) {
				// code
				var spy      = sinon.stub( $, 'ajax' );
				var data     = { 'method' : '' };
				var fetching = Remoting.fetch( data );

				var state = fetching.state();
				state.should.equal( 'rejected' );

				$.when( fetching ).fail( function ( error ) {
					error.should.equal( 'Missing parameter: args' );
					spy.should.have.callCount( 0 );
					done();
				} );
			} );

			it( 'should make a request for signature when passing unsigned arguments', function () {
				var spy      = sinon.stub( $, 'ajax' );
				var data     = { 'method' : '', 'args' : {} };
				var fetching = Remoting.fetch( data );

				var state = fetching.state();
				state.should.equal( 'pending' );

				spy.should.have.callCount( 1 );
			} );

		} );

	} );
	
} );
