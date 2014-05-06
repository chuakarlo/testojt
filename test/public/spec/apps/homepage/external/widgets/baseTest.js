define( function ( require ) {
	'use strict';

	var base   = require( 'apps/homepage/external/widgets/base' );
	var expect = require( 'chai' ).expect;

	describe ( 'Base Test for Widgets', function () {

		it ( 'should be an instance of BaseObject', function () {
			var BaseObj  = require( 'apps/homepage/BaseObject' );
			expect( base ).to.be.an.instanceof( BaseObj );
		} );

		it ( 'external view should be equal to ContentCollectionView ', function () {
			var exterView = require( 'apps/homepage/external/widgets/layout/WidgetLayout' );
			expect( base.getExternalView ).to.be.equal( exterView );
		} );

	} );

} );