define( function ( require ) {
	'use strict';

	var controller = require( 'apps/homepage/external/content/external/your-queue/controllers/baseController' );
	var base       = require( 'apps/homepage/external/content/external/your-queue/base' );
	var expect     = require( 'chai' ).expect;
	var sinon      = window.sinon;

	describe ( 'Base Test for Your Queue', function () {
		var sStub;
		var setHeaderStub;

		before( function () {

			sStub         = 'Rosana\'s Queue';
			setHeaderStub = sinon.stub( controller, 'doSetHeader' ).returns( sStub );
		} );

		after( function () {

			controller.doSetHeader.restore();
		} );

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

		it( 'should have a header that contains Queue', function () {
			expect( base._header() ).to.be.equal( sStub );
			setHeaderStub.should.have.callCount( 1 );
		} );

		it( 'renderToggle should return remove-from-queue' , function () {
			expect( base.renderToggle() ).to.be.equal( 'remove-from-queue' );
		} );
	} );

} );
