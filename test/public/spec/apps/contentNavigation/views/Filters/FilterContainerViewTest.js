define( function ( require ) {
	'use strict';

	var FilterContainerView = require( 'contentNavigation/views/Filters/FilterContainerView' );

	describe( 'CN-FilterContainer View', function () {

		var filterContainerView;

		before( function () {
			filterContainerView = new FilterContainerView();
		} );

		after( function () {
			filterContainerView = undefined;
		} );

		it( 'should have "tagName" ', function () {
			filterContainerView.should.have.property( 'tagName' );
		} );

		it( 'should have "className" ', function () {
			filterContainerView.should.have.property( 'className' );
		} );

		it( 'should have "template" ', function () {
			filterContainerView.should.have.property( 'template' );
		} );

		it( 'should be wrapped around a <div> element', function () {
			filterContainerView.el.tagName.should.be.equal( 'DIV' );
		} );

	} );

} );
