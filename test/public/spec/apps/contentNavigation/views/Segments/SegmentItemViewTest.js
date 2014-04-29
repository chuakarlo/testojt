define( function ( require ) {
	'use strict';

	var SegmentItemView = require( 'contentNavigation/views/Segments/SegmentItemView' );

	describe( 'CN-SegmentItem View', function () {

		var segmentItemView;
		var segmentItemChildren;

		before( function () {
			segmentItemView     = new SegmentItemView();
		} );

		after( function () {
			segmentItemView = undefined;
		} );

		it( 'should have "className" ', function () {
			segmentItemView.should.have.property( 'className' );
		} );

		it( 'should have "template" ', function () {
			segmentItemView.should.have.property( 'template' );
		} );

		it( 'should be wrapped around a <li> element', function () {
			segmentItemView.el.tagName.should.be.equal( 'LI' );
		} );

	} );

} );
