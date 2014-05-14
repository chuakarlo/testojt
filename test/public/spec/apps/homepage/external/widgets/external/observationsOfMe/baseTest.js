define ( function ( require ) {
	'use strict';

	var expect     = require( 'chai' ).expect;
	var BaseObject = require( 'apps/homepage/BaseObject');
	var base       = require( 'apps/homepage/external/widgets/external/observationsOfMe/base' );
	var itemView   = require( 'apps/homepage/external/widgets/external/observationsOfMe/views/WidgetItemView' );


	describe( '[Widgets] Observations of Me : base - Test ', function () {

		it( 'should be an instance of BaseObject', function () {
			expect( base ).to.be.an.instanceof( BaseObject );
		} );

		it( 'should be an item view of Observations Of Me WidgetItemView', function () {
			expect( base.getExternalView ).to.be.equal( itemView );
		} );

	} );
} );