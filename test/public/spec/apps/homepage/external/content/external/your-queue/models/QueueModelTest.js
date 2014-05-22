define( function ( require ) {
	'use strict';

	var Model      = require( 'apps/homepage/external/content/external/your-queue/models/QueueModel' );
	var expect     = require( 'chai' ).expect;
	var controller = require( 'apps/homepage/external/content/external/your-queue/controllers/queueController' );
	var sinon      = window.sinon;

	describe( 'QueueModel Model' , function () {
		var model;
		var attributes;
		var contStub;
		var options = {
			'success' : sinon.spy(),
			'fail'    : sinon.spy()
		};

		var updateCheck = function () {
			var newAttr = {
				id        : 1,
				ContentId : 1,
				module    : 'homepage view'
			};

			model.save( newAttr, options );
			expect( contStub.callCount ).to.have.length.equal( 1 );
		};

		before( function () {

			contStub   = sinon.stub( controller, 'doFetch' );
			attributes = {
				ContentId : 1,
				module    : 'homepage'
			};
			model     = new Model( attributes );
			model.url = '/';
		} );

		after( function () {
			controller.doFetch.restore();
		} );

		it( 'idAttribute should return a string', function () {
			expect( model.idAttribute ).a( 'string' );
		} );

		describe( 'sync model functions', function () {
			it( 'update', function () {
				updateCheck();
			} );

			it( 'destroy', function () {
				model.destroy( options );
				expect( contStub.callCount ).to.have.length.equal( 2 );
			} );

		} );
	} );
} );
