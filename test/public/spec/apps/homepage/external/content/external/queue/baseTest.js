define( function ( require ) {
	'use strict';

	var base   = require( 'apps/homepage/external/content3/external/queue/base' );
	var expect = require( 'chai' ).expect;
	describe ( 'Base Test for Your Queue', function () {
		before( function () {

		} );

		after( function () {
		} );

		it ( 'should be an instance of BaseObject', function () {
			expect( base ).to.be.an.instanceof( Object );
		} );

		it ( 'id should be equal to your-queue ', function () {
			expect( base.id ).to.be.equal( 'your-queue' );
		} );

		it ( 'collection should be equal to QueueCollection ', function () {
			var collection   = require( 'apps/homepage/external/content3/external/queue/collections/QueueCollection' );
			expect( base.collection ).to.be.equal( collection );
		} );
	} );

} );
