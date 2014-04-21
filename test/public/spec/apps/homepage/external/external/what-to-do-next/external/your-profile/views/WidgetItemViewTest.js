define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var expect     = require( 'chai' ).expect;

	describe ( 'Your Profile WidgetItemView', function () {
		before ( function () {
			var ItemView = require( 'external/external/what-to-do-next/external/your-profile/views/WidgetItemView' );
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