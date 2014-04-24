define( function ( require ) {

	'use strict';

	var ErrorView = require( 'contentNavigation/views/ErrorView' );

	describe( 'Error  View', function () {

		var errorView;

		before( function () {
			errorView   = new ErrorView();
		} );

		after( function () {
			errorView   = undefined;
		} );

		it( 'should have "template" ', function () {
			errorView.should.have.property( 'template' );
		} );

		it( 'should have "className" ', function () {
			errorView.should.have.property( 'className' );
		} );

		it( 'should be wrapped around a <div> element', function () {
			errorView.el.tagName.should.be.equal( 'DIV' );
		} );
	} );

} );