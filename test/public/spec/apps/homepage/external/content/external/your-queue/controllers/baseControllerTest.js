define ( function ( require ) {
	'use strict';

	var sinon      = window.sinon;
	var expect     = require( 'chai' ).expect;
	var App        = require( 'App' );
	var controller = require( 'apps/homepage/external/content/external/your-queue/controllers/baseController' );

	describe( 'Your Queue - baseController', function () {

		it( 'doSetHeader should return a template', function () {
			var sFirstName     = 'Rosana';
			var headerStub     = sinon.stub( App, 'request' ).returns( { 'FirstName' : sFirstName } );
			var templateHeader = controller.doSetHeader();

			expect( templateHeader ).to.be.a( 'string' ).and
															.to.contain( sFirstName );
			expect( headerStub.callCount ).to.have.length.equal( 1 );

			App.request.restore();
		} );
	} );

} );
