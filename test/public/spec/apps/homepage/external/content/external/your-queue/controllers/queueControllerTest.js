define( function ( require ) {
	'use strict';

	var Remoting   = require( 'Remoting' );
	var $          = require( 'jquery' );
	var sinon      = window.sinon;
	var expect     = require( 'chai' ).expect;
	var controller = require( 'apps/homepage/external/content/external/your-queue/controllers/queueController' );

	describe( 'queueController - Your Queue' , function () {
		var options;
		var remoteStub;
		var arModel;

		var stubCheck = function () {
			options = {
				'success' : sinon.spy(),
				'error'   : sinon.spy()
			};
			arModel    = [ { 'id' : 1 } ];
			remoteStub = sinon.stub( Remoting, 'fetch' ).returns ( arModel );
		};

		var doFetchCheck = function () {
			$.when( controller.doFetch( [ ], options ) ).done ( function () {
				expect( remoteStub.callCount ).to.be.equal( 1 );
				expect( Remoting.fetch( 'request' ) ).to.equal( arModel );
				expect( options.success.callCount ).to.be.equal( 1 );
			} );
		};

		describe( 'doFetch() success', function () {

			before( function () {
				stubCheck();
			} );

			after( function () {
				remoteStub.restore();
			} );

			it( ' doFetch() should call success', function ( done ) {
				doFetchCheck();
				done();
			} );
		} );

		describe( 'doFetch() Fail', function () {
			var options;
			var remoteStub;

			before( function () {
				options = {
					'success' : sinon.spy(),
					'error'   : sinon.spy()
				};
				remoteStub = sinon.stub( Remoting, 'fetch' ).returns ( $.Deferred().reject( 'err' ) );
			} );
			after( function () {
				remoteStub.restore();
			} );

			it( ' doFetch() should call error', function ( done ) {
				$.when( controller.doFetch( [ ], options ) ).done ( function () {
					expect( remoteStub.callCount ).to.be.equal( 1 );
					expect( options.error.callCount ).to.be.equal( 1 );

					done();
				} );

			} );
		} );

	} );

} );
