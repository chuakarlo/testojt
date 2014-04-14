define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var expect     = require( 'chai' ).expect;

	describe ( 'Your Profile InactiveWidgetItemView', function () {
		before ( function () {
			var ItemView = require( 'external/external/what-to-do-next/external/your-profile/views/InactiveWidgetItemView' );
			this.itemView = new ItemView();
		} );

		it( 'should be an instance of ItemView ', function () {
			expect( this.itemView ).to.be.an.instanceof( Marionette.ItemView );
		} );

		it( 'should have a template', function () {
			expect( this.itemView.template ).to.not.be.equal( undefined );
		} );

	} );

} );