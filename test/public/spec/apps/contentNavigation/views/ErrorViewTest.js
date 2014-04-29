define( function ( require ) {

	'use strict';

	var CnErrorView = require( 'contentNavigation/views/ErrorView' );

	describe( 'CN-Error  View', function () {

		var cnErrorView;

		before( function () {
			cnErrorView = new CnErrorView();
		} );

		after( function ( ) {
			cnErrorView = undefined;
		} );

		it( 'should have "className" ', function () {
			cnErrorView.should.have.property( 'className' );
		} );

		it( 'should be wrapped around a <div> element', function () {
			cnErrorView.el.tagName.should.be.equal( 'DIV' );
		} );
	} );

} );