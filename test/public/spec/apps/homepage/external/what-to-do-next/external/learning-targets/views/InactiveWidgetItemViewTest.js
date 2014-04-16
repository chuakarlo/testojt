define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var expect     = require( 'chai' ).expect;

	describe ( 'Group Activity InactiveWidgetItemView', function () {

		var itemView;

		before ( function (  ) {
			var ItemView = require( 'apps/homepage/external/what-to-do-next/external/learning-targets/views/InactiveWidgetItemView' );
			itemView = new ItemView();
		} );

		it( 'should be an instance of ItemView ', function () {
			expect( itemView ).to.be.an.instanceof( Marionette.ItemView );
		} );

		it( 'should have a template', function () {
			expect( itemView.template ).to.not.be.equal( undefined );
		} );

	} );

} );