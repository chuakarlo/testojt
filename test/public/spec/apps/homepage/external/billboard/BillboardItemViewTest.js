define ( function ( require ) {
	'use strict';

	var Marionette        = require( 'marionette' );
	var BillboardItemView = require( 'apps/homepage/external/billboard/BillboardItemView' );
	var expect            = require( 'chai' ).expect;

	describe ( 'BillboardItemView ItemView', function () {

		before ( function () {
			this.itemView = new BillboardItemView();
		} );

		it( 'should be an instance of ItemView', function () {
			expect( this.itemView ).to.be.an.instanceof( Marionette.ItemView );
		} );

		it ( 'should have a template', function () {
			expect( this.itemView ).to.not.be.equal( undefined );
		} );
		//should have more test for actual data

	} );

} );