define( function ( require ) {
	'use strict';

	var expect   = require( 'chai' ).expect;
	var sinon    = window.sinon;
	var Remoting = require( 'Remoting' );
	var $        = require( 'jquery' );

	describe ( 'QueueCollection Collection', function () {

		var collection;
		var remotingStub;

		var fetchCheck = function () {
			var options      = {
				'success' : sinon.spy(),
				'fail'    : sinon.spy()
			};
			$.when( collection.fetch( options ) ).done( function () {

				expect( remotingStub.callCount ).to.be.equal( 1 );
				expect( options.success.callCount ).to.be.equal( 1 );

			} );
		};

		before ( function () {

			var Collection = require ( 'apps/homepage/external/content3/external/queue/collections/QueueCollection' );
			collection   = new Collection();
			remotingStub = sinon.stub( Remoting , 'fetch' ).returns( [ { id : 1 } ] );
		} );

		after ( function () {

			collection = null;
			remotingStub.restore();
		} );

		it ( 'should be an instance of Backbone Collection', function () {
			var Backbone = require( 'backbone' );
			expect( collection ).to.be.an.instanceof( Backbone.Collection );
		} );

		it( 'collection should be fetched' , function ( done ) {
			fetchCheck();
			done();
		} );
	} );
} );
