define( function ( require ) {
	'use strict';

	var expect = require( 'chai' ).expect;

	describe( 'ContentItemView ItemView ', function () {
		before ( function () {
			var ContentItemView = require ( 'apps/homepage/external/content/views/ContentItemView' );
			this.itemView       = new ContentItemView( );
		} );

		it ( 'should be an instance of Marionette ItemView', function () {
			var Marionette = require( 'marionette' );
			expect( this.itemView ).to.be.an.instanceof( Marionette.ItemView );
		} );

		it ( 'should have a template', function () {
			expect( this.itemView.template ).to.not.equal( undefined );
		} );

		it ( 'should have a tagName', function () {
			expect( this.itemView.tagName ).to.not.equal( undefined );
		} );

		it ( 'should have a className', function () {
			expect( this.itemView.className ).to.not.equal( undefined );
		} );

	} );
} );