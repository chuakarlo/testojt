define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var expect     = require( 'chai' ).expect;

	describe ( 'Group Activity WidgetItemView', function () {

		var itemView;

		before ( function () {
			var ItemView = require( 'apps/homepage/external/what-to-do-next/external/group-activity/views/WidgetItemView' );
			itemView = new ItemView();
		} );

		it( 'should be an instance of ItemView ', function () {
			expect( itemView ).to.be.an.instanceof( Marionette.ItemView );
		} );

		it( 'should have a template', function () {
			expect( itemView.template ).to.not.be.equal( undefined );
		} );

		it( 'should have a className', function () {
			expect( itemView.className ).to.not.be.equal( undefined );
		} );

	} );

} );