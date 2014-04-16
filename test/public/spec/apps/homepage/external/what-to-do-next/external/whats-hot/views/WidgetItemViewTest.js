define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var expect     = require( 'chai' ).expect;

	describe ( 'What\'s Hot WidgetItemView', function () {
		before ( function () {
			var ItemView = require( 'apps/homepage/external/what-to-do-next/external/whats-hot/views/WidgetItemView' );
			this.itemView = new ItemView();
		} );

		it( 'should be an instance of ItemView ', function () {
			expect( this.itemView ).to.be.an.instanceof( Marionette.ItemView );
		} );

		it( 'should have a template', function () {
			expect( this.itemView.template ).to.not.be.equal( undefined );
		} );

		it( 'should have a className', function () {
			expect( this.itemView.className ).to.not.be.equal( undefined );
		} );

	} );

} );