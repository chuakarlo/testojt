define ( function ( require ) {
	'use strict';

	var BaseItemView = require( 'external/views/BaseItemView' );
	var Marionette   = require( 'marionette' );
	var expect       = require( 'chai' ).expect;

	describe( 'BaseItemView ItemView', function () {

		before( function () {
			this.baseItemView = new BaseItemView();
		} );

		it( 'should be an instance of Itemview', function () {
			expect( this.baseItemView ).to.be.an.instanceOf( Marionette.ItemView );
		} );

		it ( 'should have a template', function () {
			expect( this.baseItemView.template ).to.not.be.equal( undefined );
		} );

	} );

} );