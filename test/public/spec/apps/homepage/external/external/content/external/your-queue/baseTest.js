define( function ( require ) {
	'use strict';

	var base     = require( 'external/external/content/external/your-queue/base' );
	var expect   = require( 'chai' ).expect;

	describe ( 'Base Test for Your Queue', function () {

		it ( 'should be an instance of BaseObject', function () {
			var BaseObj  = require( 'external/BaseObject' );
			expect( base ).to.be.an.instanceof( BaseObj );
		} );

		it ( 'id should be equal to your-queue ', function () {
			expect( base._id ).to.be.equal( 'your-queue' );
		} );

		it ( 'header should contain Queue ', function () {
			var sharedData = {
				userInfo : {
					fName : 'Rosana'
				}
			};
			var header = base._header( sharedData );
			expect( header ).to.contain( 'Queue' );
		} );

		it ( 'collection should be equal to QueueCollection ', function () {
			var collection   = require( 'external/external/content/external/your-queue/collections/QueueCollection' );
			expect( base._items ).to.be.equal( collection );
		} );

	} );

} );