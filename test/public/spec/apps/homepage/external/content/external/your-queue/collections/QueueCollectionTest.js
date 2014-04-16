define( function ( require ) {
	'use strict';

	var expect   = require( 'chai' ).expect;
	var sinon    = window.sinon;
	var Remoting = require( 'Remoting' );
	var $        = require( 'jquery' );


	describe ( 'QueueCollection Collection', function () {

		var collection;

		before ( function () {
			var Collection = require ( 'apps/homepage/external/content/external/your-queue/collections/QueueCollection' );
			collection = new Collection();
		} );

		after ( function () {
			collection = null;
			Remoting.fetch.restore();
		} );

		it ( 'should be an instance of Backbone Collection', function () {
			var Backbone = require( 'backbone' );
			expect( collection ).to.be.an.instanceof( Backbone.Collection );
		} );

		it( 'collection should be fetched' , function ( done ) {
			var remotingStub = sinon.stub( Remoting , 'fetch' ).returns( [ { id : 1 }] );

			var options      = {
				'success' : sinon.spy(),
				'fail'    : sinon.spy()
			};

			$.when( collection.fetch( options ) ).done( function () {

				expect( remotingStub.callCount ).to.be.equal( 1 );
				expect( options.success.callCount ).to.be.equal( 1 );
				done();

			} );

		} );
	} );
} );