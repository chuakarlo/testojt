define ( function ( require ) {
	'use strict';

	var BaseItemView = require( 'external/views/BaseItemView' );
	var Marionette   = require( 'marionette' );
	var expect       = require( 'chai' ).expect;

	describe( 'BaseItemView ItemView', function () {

		var baseItemView;

		before( function () {
			baseItemView = new BaseItemView();
		} );

		it( 'should be an instance of Itemview', function () {
			expect( baseItemView ).to.be.an.instanceOf( Marionette.ItemView );
		} );

		it ( 'should have a template', function () {
			expect( baseItemView.template ).to.not.be.equal( undefined );
		} );

	} );

} );