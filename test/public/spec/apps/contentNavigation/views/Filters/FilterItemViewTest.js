define( function ( require ) {
	'use strict';

	// dependency modules
	var FilterItemView= require( 'contentNavigation/views/Filters/FilterItemView' );

	describe( 'CN-FilterItem View', function () {

		var filterItemView;

		before( function () {
			filterItemView = new FilterItemView();
		} );

		after( function () {
			filterItemView = undefined;
		} );

		it( 'should have "className" ', function () {
			filterItemView.should.have.property( 'className' );
		} );

		it( 'should have "template" ', function () {
			filterItemView.should.have.property( 'template' );
		} );

		it( 'should be wrapped around a <li> element', function () {
			filterItemView.el.tagName.should.be.equal( 'LI' );
		} );

	} );

} );
