define ( function( require ) {
	'use strict';

	var expect     = require( 'chai' ).expect;
	var BaseObject = require( 'apps/homepage/BaseObject');
	var base       = require( 'apps/homepage/external/widgets/external/focusObjective/base' );
	var itemView   = require( 'apps/homepage/external/widgets/external/focusObjective/views/WidgetItemView' );


	describe( '[Widgets] Focus Objectives : base - Test ', function () {

		it( 'should be an instance of BaseObject', function () {
			expect( base ).to.be.an.instanceof( BaseObject );
		} );

		it( 'should an item view of focus objective WidgetItemView', function () {
			expect( base.getExternalView ).to.be.equal( itemView );
		} );

	} );
} );