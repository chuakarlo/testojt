define( function ( require ) {
	'use strict';

	var base     = require( 'apps/homepage/external/content/external/your-queue/base' );
	var expect   = require( 'chai' ).expect;

	describe ( 'Base Test for Your Queue', function () {

		it ( 'should be an instance of BaseObject', function () {
			var BaseObj  = require( 'apps/homepage/BaseObject' );
			expect( base ).to.be.an.instanceof( BaseObj );
		} );

		it ( 'id should be equal to your-queue ', function () {
			expect( base._id ).to.be.equal( 'your-queue' );
		} );

		it ( 'collection should be equal to QueueCollection ', function () {
			var collection   = require( 'apps/homepage/external/content/external/your-queue/collections/QueueCollection' );
			expect( base._items ).to.be.equal( collection );
		} );

	} );

} );