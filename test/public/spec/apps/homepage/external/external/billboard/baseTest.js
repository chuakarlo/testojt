define ( function( require ) {
	'use strict';

	var expect     = require( 'chai' ).expect;
	var BaseObject = require( 'external/BaseObject');
	var base       = require( 'external/external/billboard/base' );
	var itemView   = require( 'external/external/billboard/BillboardItemView' );


	describe( 'Billboard : base - Test ', function () {

		it( 'should be an instance of BaseObject', function () {
			expect( base ).to.be.an.instanceof( BaseObject );
		} );

		it( 'should an item view of BillboardItemView', function () {
			expect( base.getExternalView ).to.be.equal( itemView );
		} );

	} );
} );