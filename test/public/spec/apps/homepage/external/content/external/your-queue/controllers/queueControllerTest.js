define( function ( require ) {
	'use strict';

	var Remoting   = require( 'Remoting' );
	var $          = require( 'jquery' );
	var sinon      = window.sinon;
	var expect     = require( 'chai' ).expect;
	var controller = require( 'apps/homepage/external/content/external/your-queue/controllers/queueController' );

	describe( 'queueController - Your Queue' , function () {

		var options;
		before( function () {
			options = {
				'success' : sinon.spy(),
				'error'    : sinon.spy()
			};
		} );

		it( ' doFetch() success', function ( done ) {
			var arModel = [ { 'id' : 1 } ];
			var remoteStub = sinon.stub( Remoting, 'fetch' ).returns ( arModel );

			$.when( controller.doFetch( [], options ) ).done ( function () {
				expect( remoteStub.callCount ).to.be.equal( 1 );
				expect( Remoting.fetch( 'request' ) ).to.equal( arModel );
				expect( options.success.callCount ).to.be.equal( 1 );

				Remoting.fetch.restore();
				done();
			} );

		} );

		it( ' doFetch() fail', function ( done ) {
			var remoteStub = sinon.stub( Remoting, 'fetch' ).returns ( $.Deferred().reject( 'err' ) );

			$.when( controller.doFetch( [], options ) ).done ( function () {
				expect( remoteStub.callCount ).to.be.equal( 1 );
				expect( options.error.callCount ).to.be.equal( 1 );

				Remoting.fetch.restore();
				done();
			} );

		} );

	} );

} );

